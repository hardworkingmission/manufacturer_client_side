import React from 'react';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    const { register, formState: { errors }, handleSubmit,reset } = useForm();
    const onSubmit = data => {
        toast.success(`Hi, ${data.name}.I have received your email`)
        reset()
        // fetch('https://gentle-lake-87574.herokuapp.com/sendEmail',{
        //     method:"POST",
        //     headers:{
        //         "content-type":"application/json"
        //     },
        //     body:JSON.stringify(data)
        // }).then(res=>res.json())
        //   .then(data=>{
        //       if(data.success){
        //           toast.success('I have received your email')
        //           reset()
        //       }
        //   })
    };
    
    return (
        <div className='lg:w-2/6 md:w-2/6 w-full  mx-auto my-5'> 
            <ToastContainer/>
            <h3 className='lg:text-[48px] md:text-[48px] text-[35px] font-[700] text-[#BF7506] text-center my-5'>Contact Me</h3>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className='mb-2'>
                    <input {...register("name", { required: true })} className="border-2 p-2 w-full rounded-lg outline-none" placeholder='Name'/>
                    <p className='text-red-600'>{errors.name?.type === 'required' && "Name is required"}</p> 
                </div>
                <div className='mb-2'>
                    <input {...register("email", { required: true,pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/})} className="border-2 p-2 w-full rounded-lg outline-none" placeholder='Email'/>
                    <p className='text-red-600'>{errors.email?.type === 'required' && "Email is required"}</p>
                    <p className='text-red-600'>{errors.email?.type === 'pattern' && "Invalid Email"}</p>
                </div>
                <div className='mb-2'>
                    <textarea rows={'4'} {...register("textMessage", { required: true })} className="border-2 p-2 w-full rounded-lg outline-none" placeholder='Type your message'/>
                    <p className='text-red-600'>{errors.textMeaasge?.type === 'required' && "Message is required"}</p>
                </div>
                <div>
                    <input type="submit" value={'Send'} className='w-full text-white rounded-lg text-lg fond-bold py-1 cursor-pointer bg-[#BF7506]'/>
                </div>
            </form>

        </div>
    );
};

export default Contact;