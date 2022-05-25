import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const useProfile = () => {
    const [user, loading, error] = useAuthState(auth);
    const [profileData,setProfileData]=useState({})
    const [refetch,setRefetch]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    const [profileError,setProfileError]=useState('')
    const email=user?.email
    useEffect(()=>{
        fetch(`http://localhost:5000/myprofile/${email}`,{
            headers:{
                "Content-Type":"application/json",
                authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res=>res.json())
          .then(data=>{
               setIsLoading(false)
               setProfileData(data)

          }).catch(err=>setProfileError(err.message))

    },[email,refetch])
    return [profileData,isLoading,profileError,setRefetch]
};

export default useProfile;