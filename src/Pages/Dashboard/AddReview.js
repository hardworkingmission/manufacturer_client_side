import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../../firebase.init';
import useProfile from '../../hooks/useProfile/useProfile';

const AddReview = () => {
    const [user, loading, error] = useAuthState(auth);
    const { register, formState: { errors }, handleSubmit,reset} = useForm();
    const [profileData,isLoading,profileError,setRefetch]=useProfile()
    
    const onSubmit=(data)=>{
        const reviewInfo={
            ...data,
            name:profileData?.name,
            address:profileData?.address
        }
        fetch('https://gentle-lake-87574.herokuapp.com/review',{
            method:"POST",
            headers:{
                "content-type":"application/json",
                authorization:`Bearer ${localStorage.getItem('accessToken')}`,
            },
            body:JSON.stringify(reviewInfo)
        }).then(res=>res.json())
           .then(data=>{
               if(data){
                   toast.success('Review is added successfully!')
                   reset()
               }
           })

    }
    const ratings=[1,1.5,2,2.5,3,3.5,4,4.5,5]
    return (
        <div className='w-5/6 mx-auto my-5 flex justify-center'>
            <ToastContainer/>
            <div className="p-5 rounded-lg lg:w-3/6 md:w-1/2 w-full shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <h3 className='text-xl text-[#605C3C] font-bold'>Please give a review</h3>
                    <div className='my-2'>
                        Feedback
                        <textarea  {...register("comment", { required: true})} className="w-full p-2 outline-none rounded-lg border-2" placeholder='Write your feedback'/>
                        <p className='text-red-600'>{errors.comment?.type === 'required' && "Feedback is required"}</p>
                    </div>
                    <div className='my-2'>
                        Ratings
                        <select className="w-full p-2 outline-none rounded-lg border-2"  {...register("ratings", { required: true,maxLength:5,minLength:1})}>
                            {
                                ratings?.map((rat,index)=>(
                                    <option key={index} value={rat}>{rat}</option>
                                ))
                            }

                        </select>
                    </div>
                   
                    <div className=''>
                        <input type="submit" value="Add Review"className=" cursor-pointer w-full p-2 outline-none rounded-lg bg-[#605C3C] text-white" />
                    </div>
                </form>
               
            </div>
        </div>
    );
};

export default AddReview;