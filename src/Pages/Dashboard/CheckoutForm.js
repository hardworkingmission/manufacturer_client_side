import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
//import CustomSpinner from '../CustomSpinner/CustomSpinner';
// https://github.com/stripe/react-stripe-js/blob/master/examples/hooks/0-Card-Minimal.js
const CheckoutForm = ({order}) => {
    const {_id,totalPrice,name,email}=order
    const stripe = useStripe();
    const elements = useElements();
    const [cardError,setCardError]=useState('')
    const [success,setSuccess]=useState('')
    const [transactionId,setTransactionId]=useState('')
    const [clientSecret, setClientSecret] = useState("");
    const [processing,setProcessing]=useState(false)
    
    useEffect(()=>{
        fetch('http://localhost:5000/create-payment-intent',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                authorization:`Bearer ${localStorage.getItem('accessToken')}`

            },
            body:JSON.stringify({price:totalPrice})
        }).then(res=>res.json())
           .then(data=>{
               if(data?.clientSecret){
                setClientSecret(data.clientSecret)
               }
           })

    },[totalPrice])
    // if(processing){
    //     return <CustomSpinner/>
    // }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(!stripe||!elements){
            return
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
          //error handle
          setCardError(error?.message||'')
          setSuccess('')
          setTransactionId('')
          setProcessing(true)
          //error?setCardError(error):setCardError('')

          //confirm payment
          const {paymentIntent, error:intentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card, 
                billing_details: {
                  name: name,
                  email:email
                },
              },
            },
          );
          if(intentError){
              setCardError(intentError?.message)
              setProcessing(false)
          }else{
            setCardError('')
            console.log(paymentIntent)
            setTransactionId(paymentIntent.id)
            setSuccess('Payment has completed')
            const payment={
                order:_id,
                transactionId:paymentIntent.id
            }
            fetch(`http://localhost:5000/order/${_id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                    authorization:`Bearer ${localStorage.getItem('accessToken')}`
                },
                body:JSON.stringify(payment)
            }).then(res=>res.json())
               .then(data=>{
                   setProcessing(false)
                   console.log(data)
               })
          }
    }
    
    console.log(clientSecret)
    return (
        <div>
           <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                    style: {
                        base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                        },
                        invalid: {
                        color: '#9e2146',
                        },
                    },
                    }}
                />
                <p className='my-2 text-red-600'>{cardError&&cardError}</p>
                {
                    success&&<>
                    <p className='text-green-600'>{success}</p>
                    <p >Your Transaction Id:<span className='text-orange-600'>{transactionId}</span></p>
                    </>
                }
                <button type="submit" disabled={!stripe||!clientSecret} className='px-2 py-1 bg-green-400 text-white rounded my-2 w-full'>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;