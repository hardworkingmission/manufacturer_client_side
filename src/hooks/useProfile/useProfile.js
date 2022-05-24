import { useQuery } from 'react-query';

const useProfile = (user) => {
    const {data:profileData,isLoading,error:queryError,refetch}=useQuery(['profile',user],()=>(
        fetch(`http://localhost:5000/myprofile?email=${user?.email}`,{
                    headers:{
                        authorization:`Bearer ${localStorage.getItem('accessToken')}`,
                    }
                }).then(res=>res.json())
    ))
    return [profileData,isLoading,queryError,refetch]
};

export default useProfile;