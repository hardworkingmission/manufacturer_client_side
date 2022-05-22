import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';
import auth from '../../firebase.init';

const SocialLogin = () => {
    const [signInWithGoogle, socialLoginUser, socialLoginLoading, socialLoginError] = useSignInWithGoogle(auth);

    //redirect to desnation
    const navigate=useNavigate()
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    if(socialLoginUser){
        navigate(from, { replace: true });
    }
    
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