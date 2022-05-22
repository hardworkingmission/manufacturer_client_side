import React from 'react';
import { Link } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import auth from '../../firebase.init';

const Login = () => {
    const [
        signInWithEmailAndPassword,
        loginUser,
        loginLoading,
        loginError,
      ] = useSignInWithEmailAndPassword(auth);
      const { register, formState: { errors }, handleSubmit} = useForm();
      const onSubmit=(data)=>{
          console.log(data)
      }
    return (
        <div className='my-5 flex justify-center'>
            <div className="p-5 rounded-lg lg:w-2/6 md:w-1/2 w-full shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <h3 className='text-xl text-[#605C3C] font-bold'>Login</h3>
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
                    <div className=''>
                        <input type="submit" value="Login"className="w-full p-2 outline-none rounded-lg bg-[#605C3C] text-white" />
                    </div>
                </form>
                <div className='mt-1 text-right'>
                    <p className='underline text-blue-600'>Forgot Password?</p>
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
                    <button className='w-full p-2 outline-none rounded-lg bg-[#605C3C] text-white'>Continue with Google</button>
                </div>
                <div>
                    <p className=''>Need an account? <Link to='/signup' className='underline text-blue-600'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;