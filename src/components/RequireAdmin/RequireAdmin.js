import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin/useAdmin';
import CustomSpinner from '../CustomSpinner/CustomSpinner';

const RequireAdmin = ({children}) => {
    const [user, loading, error] = useAuthState(auth);
    const [admin,isAdminLoading,adminError]=useAdmin(user)
    let location=useLocation()
    if(loading||isAdminLoading){
        return <CustomSpinner/>;
    }
    if(!user||!admin?.admin){
        signOut(auth)
        return <Navigate to={'/login'} state={{from:location}} replace/>
    }else{
        return children
    }
    
};

export default RequireAdmin;