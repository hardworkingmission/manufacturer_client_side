import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';
import auth from '../../firebase.init';

const SocialLogin = () => {
    const [signInWithGoogle, socialLoginUser, socialLoginLoading, socialLoginError] = useSignInWithGoogle(auth);
    const navigate=useNavigate()
    const handleSignInWithGoogle=()=>{
        signInWithGoogle()

    }
    if(socialLoginLoading){
        return <CustomSpinner/>
    }
    if(socialLoginUser){
        navigate('/')
    }
    return (
        <div>
            <p className='text-red-600'>{socialLoginError?socialLoginError.message:''}</p>
            <button className='w-full p-2 outline-none rounded-lg bg-[#605C3C] text-white' onClick={handleSignInWithGoogle}>Continue with Google</button>
        </div>
    );
};

export default SocialLogin;