import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import auth from '../../firebase.init';

const Purchase = () => {

    const [user, loading, error] = useAuthState(auth);
    const {id}=useParams()
    const [partsItem,setPartsItem]=useState({})
    const [quantity,setQuantity]=useState(0)
    const [maxQuantity,setMaxQuantity]=useState(0)
    // [agree,setAgree]=useState(false)
    useEffect(()=>{
        fetch(`http://localhost:5000/partsItemById/${id}`)
           .then(res=>res.json())
           .then(data=>{
               setPartsItem(data)
               setQuantity(data.minQuantity)
               setMaxQuantity(data.availableQuantity-data.minQuantity)
            })

    },[id])

    const{_id,img,name,description,minQuantity,availableQuantity,price}=partsItem
    //current value
    useEffect(()=>{

    },[quantity,maxQuantity])


    //increase quantity
    const increasePurchaseQuantity=()=>{
    //console.log('ok',quantity)
    if(quantity<availableQuantity){
        setQuantity(parseInt(quantity)+1)
        setMaxQuantity(maxQuantity-1)
    }else{
        setQuantity(availableQuantity)
        toast.error('You Can not order more than available quantity')
        
    }
    }

    //decrease quantity
    const decreasePurchaseQuantity=()=>{
        //console.log('ok',quantity)
        if(quantity>minQuantity){
            setQuantity(parseInt(quantity)-1)
            setMaxQuantity(maxQuantity+1)
        }else{
            setQuantity(minQuantity)
            toast.error('You Can not order less than minimum quantity')
            // setAgree(true)
        }
    }
      
    const { register, formState: { errors }, handleSubmit,reset} = useForm();

    const onSubmit=(data)=>{
        if(quantity>=minQuantity&&quantity<=availableQuantity){
            const order={
                ...data,
                partsName:name,
                partsId:_id,
                img:img,
                totalPrice:parseInt(quantity)*parseInt(price),
                purchaseQuantity:quantity
            }
            fetch('http://localhost:5000/order',{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(order)

            }).then(res=>res.json())
               .then(data=>{
                   if(data){
                       toast.success('The order is placed successfully')
                       reset()
                       const currentAvailableQuantity={availableQuantity:maxQuantity}
                        fetch(`http://localhost:5000/parts/${data?.partsId}`,{
                            method:"PATCH",
                            headers:{
                                "content-type":"application/json"
                            },
                            body:JSON.stringify(currentAvailableQuantity)
                        }).then(res=>res.json())
                          .then(data=>console.log('updated',data))

                   }
                   
               })

        }else{
            quantity>availableQuantity?toast.error(`You Can not order more than available quantity`):toast.error('You Can not order less than minimum quantity')
            setQuantity(minQuantity)
        } 
    }
   
    
    return (
        <div className='w-5/6 mx-auto flex justify-center my-5'>
            <ToastContainer/>
            <div className='lg:w-4/6 md:w-5/6 w-full rounded-lg shadow-lg border-2'>
                {/* parts detail */}
                <div className='text-center'>
                    <div className="item-img flex justify-center">
                        <img src={process.env.PUBLIC_URL+`/parts/${img}`} alt="" className='h-[200px] w-[200px]' />
                    </div>
                    <div className='item-info p-5'>
                        <h3 className='font-bold text-lg'>{name}</h3>
                        <h4><span className='font-bold '>Minimum Quantity:</span> {minQuantity}</h4>
                        <h4><span className='font-bold '>Available Quantity:</span> {maxQuantity}</h4>
                        <h4><span className='font-bold '>Price:</span> ${price}</h4>
                    </div>
                    <div className='text-center'>
                        <h1 className='font-bold text-lg'>Purchase Quantity</h1>
                        <div className='flex items-center justify-center'>
                            <button className={`text-2xl py-1.4 px-2 rounded-lg ${quantity<=minQuantity?'bg-gray-600':'bg-[#605C3C] text-white'}`} onClick={decreasePurchaseQuantity} disabled={quantity<minQuantity&&true}>-</button>
                            <input type="text" className='p-1.5 border-2 w-[100px] mx-2 rounded-lg text-center' value={quantity}/>
                            <button className={`text-2xl py-1.4 px-2 rounded-lg ${quantity>=availableQuantity?'bg-gray-600':'bg-[#605C3C] text-white'}`} onClick={increasePurchaseQuantity} disabled={quantity>availableQuantity&&true}>+</button>
                        </div> 
                    </div>
                </div>
                {/* form */}
                <div className="p-5 w-full">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className='my-2'>
                            <input {...register("name", {value:user?.displayName })} defaultValue={user?.displayName} className="w-full p-2 outline-none  border-b-2" readOnly disabled/>
                        </div>
                        <div className='mb-2'>
                            <input type={'email'} {...register("email",{value:user?.email})} defaultValue={user?.email} className="w-full p-2 outline-none  border-b-2" readOnly disabled/>
                        </div>
                        <div className='mb-2'>
                            <input  {...register("phone",{required:true})} className="w-full p-2 outline-none  border-b-2" placeholder='Phone' />
                            <p className='text-red-600'>{errors.phone?.type === 'required' && "Phone number is required"}</p>
                        </div>
                        <div className='mb-2'>
                            <textarea rows={3}  {...register("address",{required:true})} className="w-full p-2 outline-none  border-b-2" placeholder='Shipping Address'/>
                            <p className='text-red-600'>{errors.address?.type === 'required' && "Address is required"}</p>
                        </div>
                        <div className=''>
                            <input type="submit" value="Complete"className="w-full p-2 outline-none rounded-lg bg-[#605C3C] text-white" />
                        </div>
                    </form>
                </div>


                
            </div>
        </div>
    );
};

export default Purchase;