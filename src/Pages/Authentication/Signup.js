import React from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import auth from '../../firebase.init';

const Signup = () => {
    const [
        createUserWithEmailAndPassword,
        signupUser,
        signupLoading,
        signupError,
      ] = useCreateUserWithEmailAndPassword(auth,{sendEmailVerification:true});
    return (
        <div>
            
        </div>
    );
};

export default Signup;