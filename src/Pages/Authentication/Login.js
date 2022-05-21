import React from 'react';
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
    return (
        <div>
            
        </div>
    );
};

export default Login;