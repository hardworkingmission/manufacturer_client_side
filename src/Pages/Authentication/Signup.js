import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword,useUpdateProfile } from 'react-firebase-hooks/auth';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner'
import { useForm } from "react-hook-form";
import { Link,useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const Signup = () => {
    const [
        createUserWithEmailAndPassword,
        signupUser,
        signupLoading,
        signupError,
      ] = useCreateUserWithEmailAndPassword(auth,{sendEmailVerification:true});
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    //const [error,setError]=useState('')
    const { register, formState: { errors },getValues, handleSubmit,watch,reset} = useForm();
    const navigate=useNavigate()

    const onSubmit=async(data)=>{
        const {email,name,password}=data
        await createUserWithEmailAndPassword(email,password)
        updateProfile({ displayName:name})
    }
    if(signupLoading||updating){
        return <CustomSpinner/>
    }
    if(signupUser){
        navigate('/')
        reset()
    }
    return (
        <div className='my-5 flex justify-center'>
             <div className="p-5 rounded-lg lg:w-2/6 md:w-1/2 w-full shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <h3 className='text-xl text-[#605C3C] font-bold'>Sign Up</h3>
                    <div className='my-2'>
                        <input {...register("name", { required: true })} className="w-full p-2 outline-none rounded-lg border-2" placeholder='Name'/>
                        <p className='text-red-600'>{errors.name?.type === 'required' && "Name is required"}</p>
                    </div>
                    <div className='mb-2'>
                        <input type={'email'} {...register("email", { required: true,pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} className="w-full p-2 outline-none rounded-lg border-2" placeholder='Email'/>
                        <p className='text-red-600'>{errors.email?.type === 'required' && "Email is required"}</p>
                        <p className='text-red-600'>{errors.email?.type === 'pattern' && "Invalid Email"}</p>
                    </div>
                    <div className='mb-2'>
                        <input type={'password'} {...register("password", { required: true,pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ })} className="w-full p-2 outline-none rounded-lg border-2" placeholder='Password'/>
                        <p className='text-red-600'>{errors.password?.type === 'required' && "Password is required"}</p>
                        <p className='text-red-600'>{errors.password?.type === 'pattern' && "Password  must be 8 or more characters, at least one letter and one number"}</p>
                    </div>
                    <div className='mb-2'>
                        <input type={'password'} {...register("confirmPassword", { required: true })} className="w-full p-2 outline-none rounded-lg border-2" placeholder='Confirm Password'/>
                        <p className='text-red-600'>{errors.confirmPassword?.type === 'required' && "Confirm Password is required"}</p>
                        <p className='text-red-600'>{watch("confirmPassword") !== watch("password") &&
                            getValues("confirmPassword") ? (
                                <p>Password not match</p>
                            ) : null}
                            
                        </p>
                        
                    </div>
                    <div className=''>
                        <p className='text-red-600'>{signupError?signupError.message:''||updateError?updateError.message:''}</p>
                        <input type="submit" value="Sign Up"className="w-full p-2 outline-none rounded-lg bg-[#605C3C] text-white" />
                    </div>
                </form>
                <div className='flex justify-center items-center my-3'>
                    <div className='w-full h-[3px] bg-[#605C3C]'>
                    </div>
                    <div className='p-1 rounded-lg text-[#605C3C]'>
                        or
                    </div>
                    <div className='w-full h-[3px] bg-[#605C3C]'>
                    </div>
                </div>
                <div className='mb-2'>
                    <button className='w-full p-2 outline-none rounded-lg bg-[#605C3C] text-white'>Continue with Google</button>
                </div>
                <div>
                    <p className=''>Already an user? <Link to='/login' className='underline text-blue-600'>Login</Link></p>
                </div>
             </div>
        </div>
    );
};

export default Signup;