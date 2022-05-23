import { useEffect, useState } from "react";

const useToken = (user) => {
    const [token,setToken]=useState()
    useEffect(()=>{
        const email=user?.user?.email
        const name=user?.user?.displayName
        const currentUser={email:email,name:name}
        if(email){
            fetch(`http://localhost:5000/user/${email}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(currentUser)
            }).then(res=>res.json())
               .then(data=>{
                   if(data){
                       localStorage.setItem('accessToken',data.token)
                       setToken(data.token)
                   }
                  
               })
        }
       

    },[user])
    return [token]

    
};

export default useToken;