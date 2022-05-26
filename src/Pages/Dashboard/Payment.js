import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';
import auth from '../../firebase.init';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L0fVGJAuQhoLxlYRRlL4HF0y8pKzpqid78OXJI2Vdl64dc0Adygok10zFYPqglastj8fYwvzjHWEdIMe1O6fCxD00vNDgXMma');
const Payment = () => {
    const {id}=useParams()
    const navigate=useNavigate()
    const {data:order,isLoading,refetch}=useQuery('order',()=>(
        fetch(`https://gentle-lake-87574.herokuapp.com/orderById/${id}`,{
            method:"GET",
            headers:{
                authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }

        }).then(res=>{
            if(res.status===403||res.status===401){
                signOut(auth)
                navigate('/login')

            }
            return res.json()
        })

    ))
    if(isLoading){
        return <CustomSpinner/>
    }
    //console.log(booking)
    return (
        <div className='w-full my-5'>
           <div className='lg:w-6/12 md:w-1/2 w-full p-3 rounded-lg shadow-lg'>
               <h2 className='text-lg font-bold text-blue-600'>Hello, {order?.name}</h2>
               <p className='text-2xl'>Please pay for, <span className='font-bold text-[#605C3C]'>{order?.partsName}</span> </p>
               <h3>Your Order Id: <span className='text-red-600'>{order?._id}</span></h3>
               <h4>Please Pay: ${order?.totalPrice}</h4>
           </div>
           <div className='lg:w-6/12 md:w-1/2 w-full p-3 rounded-lg shadow-lg my-3'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm order={order} />
                </Elements>
           </div>
        </div>
    );
};

export default Payment;