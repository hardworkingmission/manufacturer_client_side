import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const SocialLogin = () => {
    const [signInWithGoogle, socialLoginUser, socialLoginLoading, socialLoginError] = useSignInWithGoogle(auth);
    return (
        <div>
            <button className='w-full p-2 outline-none rounded-lg bg-[#605C3C] text-white'>Continue with Google</button>
        </div>
    );
};

export default SocialLogin;