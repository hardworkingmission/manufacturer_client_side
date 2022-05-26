import { signOut } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import {Helmet} from 'react-helmet-async'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../../../firebase.init';


const AddProduct = () => {
    const { register, formState: { errors },getValues, handleSubmit,watch,reset} = useForm();
    const navigate=useNavigate()
    const IMAGEBB_API_KEY='3416db02f54b1be79b26ebe512924bfe'
    const onSubmit=(data)=>{
        console.log(data)
        const formData= new FormData()
        formData.append('image',data.img[0])
        fetch(`https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`,{
            method:"POST",
            body:formData
        }).then(res=>{
            if(res.status===403||res.status===401){
                signOut(auth)
                navigate('/login')

            }
            return res.json()
        }).then(result=>{
            if(result.success){
                const partsInfo={
                    name:data?.name,
                    img:result?.data.url,
                    description:data?.description,
                    minQuantity:data?.minQuantity,
                    availableQuantity:data?.availableQuantity,
                    price:data?.price
                }
                fetch('http://localhost:5000/parts',{
                    method:"POST",
                    headers:{
                        "content-type":"application/json",
                        authorization:`Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body:JSON.stringify(partsInfo)
                }).then(res=>{
                    if(res.status===403||res.status===401){
                        signOut(auth)
                        navigate('/login')
    
                    }
                    return res.json()
                }).then(data=>{
                      if(data){
                          toast.success('Parts is added Successfully')
                          reset()
                      }
                  })
            }

           })
    }
    return (
        <div className='mx-auto my-5 flex justify-center'>
            <ToastContainer/>
            <Helmet>
                <title>Add Product</title>
            </Helmet>
            <div className="p-5 rounded-lg lg:w-3/6 md:w-1/2 w-full shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <h3 className='text-xl text-[#605C3C] font-bold'>Please Add Product</h3>
                    <div className='my-2'>
                        <input {...register("name", { required: true })} className="w-full p-2 outline-none rounded-lg border-2" placeholder='Parts name'/>
                        <p className='text-red-600'>{errors.name?.type === 'required' && "Parts name is required"}</p>
                    </div>
                    <div className='mb-2'>
                        <textarea rows={3} {...register("description", { required: true })} className="w-full p-2 outline-none rounded-lg border-2" placeholder='Parts description'/>
                        <p className='text-red-600'>{errors.description?.type === 'required' && "Parts description is required"}</p>
                    </div>
                    <div className='mb-2'>
                        <input {...register("minQuantity", { required: true })} className="w-full p-2 outline-none rounded-lg border-2" placeholder='Minimum parts quantity'/>
                        <p className='text-red-600'>{errors.minQuantity?.type === 'required' && "Minimum parts quantity"}</p>
                    </div>
                    <div className='mb-2'>
                        <input {...register("availableQuantity", { required: true })} className="w-full p-2 outline-none rounded-lg border-2" placeholder='AvailableQuantity parts quantity'/>
                        <p className='text-red-600'>{errors.availableQuantity?.type === 'required' && "AvailableQuantity parts quantity is required"}</p>
                    </div>
                    <div className='mb-2'>
                        <input {...register("price", { required: true })} className="w-full p-2 outline-none rounded-lg border-2" placeholder='Price'/>
                        <p className='text-red-600'>{errors.price?.type === 'required' && "Price is required"}</p>
                    </div>
                    <div className='mb-2'>
                        <input type={'file'} {...register("img", { required: true })} className="w-full p-2 outline-none rounded-lg border-2" />
                        <p className='text-red-600'>{errors.img?.type === 'required' && "Parts image is required"}</p>
                    </div>
                    <div className=''>
                        <input type="submit" value="Add"className="w-full p-2 outline-none rounded-lg bg-[#605C3C] text-white cursor-pointer" />
                    </div>
                </form>
            </div>
        </div>       
    );
};

export default AddProduct;