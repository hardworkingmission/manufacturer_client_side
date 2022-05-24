import { useQuery } from 'react-query';

const useProfile = (user) => {
    // const {data:profileData,isLoading,error:queryError,refetch}=useQuery(['profile',user],()=>
    //     fetch(`http://localhost:5000/myprofile/${user?.email}`,{
    //                 headers:{
    //                     authorization:`Bearer ${localStorage.getItem('accessToken')}`
    //                 }
    //             }).then(res=>res.json())
    // )
    const {data:profileData,isLoading,error:queryError,refetch}=useQuery('profile',()=>(
        fetch(`http://localhost:5000/myprofile/${user?.email}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res=>res.json())

    ))
    return [profileData,isLoading,queryError,refetch]
};

export default useProfile;