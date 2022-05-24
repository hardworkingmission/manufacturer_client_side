import React, { useEffect, useState } from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword,useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import auth from '../../firebase.init';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';
import SocialLogin from './SocialLogin';
import useToken from '../../hooks/useToken/useToken';

const Login = () => {
    const [
        signInWithEmailAndPassword,
        loginUser,
        loginLoading,
        loginError,
      ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
    auth
    );
    const [email,setEmail]=useState('')
    const { register, formState: { errors }, handleSubmit,reset} = useForm();
    const[token]=useToken(loginUser)

    //redirecct to the destination
    let navigate=useNavigate()
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    useEffect(()=>{
        if(token){
            navigate(from, { replace: true });
            reset()
        }

    },[from,navigate,reset,token])
    

    const onSubmit=(data)=>{
        const {email,password}=data
        signInWithEmailAndPassword(email,password)
    }

    //reset email send
    const resetUserPassword=async()=>{
        if(email){
            await sendPasswordResetEmail(email)
            toast.success('Password Reset Email has sent..!')
            reset()
            setEmail('')
        }else{
            toast.error("Please enter email fist")
        }
    }
    if(loginLoading||sending){
        return <CustomSpinner/>
    }
    

    return (
        <div className='w-5/6 mx-auto my-5 flex justify-center'>
            <ToastContainer/>
            <div className="p-5 rounded-lg lg:w-2/6 md:w-1/2 w-full shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <h3 className='text-xl text-[#605C3C] font-bold'>Login</h3>
                    <div className='my-2'>
                        <input type={'email'} {...register("email", { required: true,pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} className="w-full p-2 outline-none rounded-lg border-2" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                        <p className='text-red-600'>{errors.email?.type === 'required' && "Email is required"}</p>
                        <p className='text-red-600'>{errors.email?.type === 'pattern' && "Invalid Email"}</p>
                    </div>
                    <div className='mb-2'>
                        <input type={'password'} {...register("password", { required: true,pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ })} className="w-full p-2 outline-none rounded-lg border-2" placeholder='Password'/>
                        <p className='text-red-600'>{errors.password?.type === 'required' && "Password is required"}</p>
                        <p className='text-red-600'>{errors.password?.type === 'pattern' && "Password  must be 8 or more characters, at least one letter and one number"}</p>
                    </div>
                    <div className=''>
                        <p className='text-red-600'>{loginError?loginError.message:''||error?error.message:''}</p>
                        <input type="submit" value="Login"className=" cursor-pointer w-full p-2 outline-none rounded-lg bg-[#605C3C] text-white" />
                    </div>
                </form>
                <div className='mt-1 text-right'>
                    <p className='underline text-blue-600 cursor-pointer' onClick={()=>resetUserPassword()}>Forgot Password?</p>
                </div>
                <div className='flex justify-center items-center my-1'>
                    <div className='w-full h-[3px] bg-[#605C3C]'>
                    </div>
                    <div className='p-1 rounded-lg text-[#605C3C]'>
                        or
                    </div>
                    <div className='w-full h-[3px] bg-[#605C3C]'>
                    </div>
                </div>
                <div className='mb-2'>
                    <SocialLogin/>
                </div>
                <div>
                    <p className=''>Need an account? <Link to='/signup' className='underline text-blue-600'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;