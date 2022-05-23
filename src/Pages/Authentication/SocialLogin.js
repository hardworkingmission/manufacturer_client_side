import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken/useToken';

const SocialLogin = () => {
    const [signInWithGoogle, socialLoginUser, socialLoginLoading, socialLoginError] = useSignInWithGoogle(auth);
    const[token]=useToken(socialLoginUser)

    //redirect to desnation
    const navigate=useNavigate()
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    useEffect(()=>{
        if(token){
            navigate(from, { replace: true });
        }
    },[token,navigate,from])

    
    
    const handleSignInWithGoogle=()=>{
        signInWithGoogle()
    }
    if(socialLoginLoading){
        return <CustomSpinner/>
    }
    return (
        <div>
            <p className='text-red-600'>{socialLoginError?socialLoginError.message:''}</p>
            <button className='w-full p-2 outline-none rounded-lg bg-[#605C3C] text-white' onClick={handleSignInWithGoogle}>Continue with Google</button>
        </div>
    );
};

export default SocialLogin;