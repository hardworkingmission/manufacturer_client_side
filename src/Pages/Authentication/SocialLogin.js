import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const SocialLogin = () => {
    const [signInWithGoogle, socialLoginUser, socialLoginLoading, socialLoginError] = useSignInWithGoogle(auth);
    return (
        <div>
            
        </div>
    );
};

export default SocialLogin;