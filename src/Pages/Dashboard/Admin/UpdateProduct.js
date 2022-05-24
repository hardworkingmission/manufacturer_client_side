import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomSpinner from '../../../components/CustomSpinner/CustomSpinner';



const UpdateProduct = ({id,closeModal}) => {
    const { register, formState: { errors },getValues, handleSubmit,watch,reset} = useForm();

    const {data:partsItem,isLoading,error,refetch}=useQuery(['parts',id],()=>
                fetch(`http://localhost:5000/partsItemById/${id}`,{
                    headers:{
                        "content-type":"application/json",
                        authorization:`Bearer ${localStorage.getItem('accessToken')}`
                    }

                })
                .then(res=>res.json())
    )
    const IMAGEBB_API_KEY='3416db02f54b1be79b26ebe512924bfe'
    const onSubmit=(data)=>{
        console.log(data)
        const formData= new FormData()
        formData.append('image',data.img[0])
        fetch(`https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`,{
            method:"POST",
            body:formData
        }).then(res=>res.json())
           .then(result=>{
            if(result.success){
                const partsInfo={
                    name:data?.name,
                    img:result?.data.url,
                    description:data?.description,
                    minQuantity:data?.minQuantity,
                    availableQuantity:data?.availableQuantity,
                    price:data?.price
                }
                fetch(`http://localhost:5000/parts/${id}`,{
                    method:"PATCH",
                    headers:{
                        "content-type":"application/json",
                        authorization:`Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body:JSON.stringify(partsInfo)
                }).then(res=>res.json())
                  .then(data=>{
                      if(data){
                          refetch()
                          toast.success('Product is updated Successfully')
                          reset()
                          closeModal()
                      }
                  })
            }

           })
    }
    if(isLoading){
        return <CustomSpinner/>
    }
    return (
        <div className='mx-auto my-5 flex justify-center'>
            <ToastContainer/>
            <div className="p-5 rounded-lg lg:w-5/6 md:w-5/6 w-full shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <h3 className='text-xl text-[#605C3C] font-bold'>Please Add Product</h3>
                    <div className='my-2'>
                        <input {...register("name", { value:partsItem?.name})} className="w-full p-2 outline-none rounded-lg border-2" placeholder='Parts name' defaultValue={partsItem?.name}/>
                    </div>
                    <div className='mb-2'>
                        <textarea rows={3} {...register("description", { value:partsItem?.description})} className="w-full p-2 outline-none rounded-lg border-2" placeholder='Parts description' defaultValue={partsItem?.description}/>
                    </div>
                    <div className='mb-2'>
                        <input {...register("minQuantity", {value:partsItem?.minQuantity })} className="w-full p-2 outline-none rounded-lg border-2" placeholder='Minimum parts quantity' defaultValue={partsItem?.minQuantity}/>
                    </div>
                    <div className='mb-2'>
                        <input {...register("availableQuantity", { value:partsItem?.availableQuantity})} className="w-full p-2 outline-none rounded-lg border-2" placeholder='AvailableQuantity parts quantity' defaultValue={partsItem?.availableQuantity}/>
                    </div>
                    <div className='mb-2'>
                        <input {...register("price", { value:partsItem?.price})} className="w-full p-2 outline-none rounded-lg border-2" placeholder='Price' defaultValue={partsItem?.price}/>
                    </div>
                    <div className='mb-2'>
                        <input type={'file'} {...register("img", {required:true})} className="w-full p-2 outline-none rounded-lg border-2" />
                        <p className='text-red-600'>{errors.img?.type === 'required' && "Image is required"}</p>
                    </div>
                    <div className=''>
                        <input type="submit" value="Update"className="w-full p-2 outline-none rounded-lg bg-[#605C3C] text-white cursor-pointer" />
                    </div>
                </form>
            </div>
        </div>       
    );
};

export default UpdateProduct;