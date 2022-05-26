import { useQuery } from 'react-query';


const useAdmin = (user) => {

    const {data:admin,isLoading:isAdminLoading,error:adminError}=useQuery(['admin',user],()=>
         fetch(`http://localhost:5000/admin/${user?.email}`,{
             method:"GET",
            headers:{
                "content-type":"application/json",
                authorization:`Bearer ${localStorage.getItem('accessToken')}`,
            },
         }).then(res=>res.json())
    )
    return [admin,isAdminLoading,adminError]
};

export default useAdmin;