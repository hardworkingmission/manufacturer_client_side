import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useQuery } from 'react-query';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';

const MyProfile = () => {
    const [user, loading, error] = useAuthState(auth);
    const { register, formState: { errors }, handleSubmit,reset} = useForm();
    const {data:profileData,isLoading,error:queryError,refetch}=useQuery('profile',()=>(
        fetch(`http://localhost:5000/myprofile?email=${user?.email}`,{
                    headers:{
                        authorization:`Bearer ${localStorage.getItem('accessToken')}`,
                    }
                }).then(res=>res.json())
    ))

    const onSubmit=(data)=>{
        //console.log(Object.values(data))
        
        if(add){
            const profileInfo={
                name:data?.uName,
                email:data?.uEmail,
                phone:data?.uPhone,
                address:data?.uAddress,
            }
            if(data.uPhone||data.uAddresse){
                fetch('http://localhost:5000/myprofile',{
                    method:"POST",
                    headers:{
                        "content-type":"application/json",
                        authorization:`Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body:JSON.stringify(profileInfo)
                }).then(res=>res.json())
                   .then(data=>{
                       if(data){
                        toast.success('Profile info added successfully')
                        refetch()
                        setAdd(false)
                        reset()
                       }
                   })
                console.log(profileInfo)
               
            }else{
                toast.error('No data is provided to complete the profile')
            }
        }
        //update profile
        if(update){
            const profileInfo={
                name:data?.name,
                email:data?.email,
                phone:data?.phone,
                address:data?.address,
            }
            fetch(`http://localhost:5000/updateprofile/${data?.email}`,{
                    method:"PUT",
                    headers:{
                        "content-type":"application/json",
                        authorization:`Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body:JSON.stringify(profileInfo)
                }).then(res=>res.json())
                   .then(data=>{
                       if(data){
                        toast.success('Profile is updated successfully')
                        refetch()
                        setUpdate(false)
                        reset()
                       }
                   })
        } 
        
    }
    const [add,setAdd]=useState(false)
    const [update,setUpdate]=useState(false)
    const addInfo=()=>{
        setUpdate(false)
        setAdd(!add)

    }
    const updateInfo=()=>{
        setAdd(false)
        setUpdate(!update)

    }
    if(isLoading||loading){
        return <CustomSpinner/>
    }
    return (
        <div className='lg:w-5/6 md:w-5/6 w-full mx-auto my-5'>
            <ToastContainer/>
            <div className='text-left'>
                {
                    profileData?(
                        <div>
                            <h3 className='text-2xl'>Name: {profileData?.name} </h3>
                            <h3>Email: {profileData?.email} </h3>
                            <address>
                                <p>{profileData?.address}</p>
                            </address>
                            <p>Phone:{profileData?.phone}</p>
                        </div>
                    ):(
                        <div>
                            <h3 className='text-2xl'>Name: {user?.displayName} </h3>
                            <h3>Email: {user?.email} </h3>
                        </div>
                    )
                }
                
                <div title='Profile' className='bg-gray-200 h-5 rounded-lg w-full my-2'>
                    <div className='bg-[#605C3C] text-white flex justify-center items-center  h-5 rounded-lg' style={{width:`${profileData?'100%':'50%'}`}}>
                    {profileData?'100%':'50%'}
                    </div>
                </div>
                <div>
                    <h3>Add information to Profile or Update </h3>
                    <button className='bg-[#605C3C] rounded-lg p-2 text-white mr-2' onClick={addInfo}>Add</button>
                    <button className='bg-blue-600 rounded-lg p-2 text-white' onClick={updateInfo}>Update</button>
                </div>
            </div>
            {/* add info */}
            <div className={`flex justify-left ${add?'block':'hidden'}`}>
                <div className="lg:w-3/6 md:w-1/2 w-full ">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <h3 className='text-xl text-[#605C3C] font-bold'>Add info to Profile</h3>
                        <div className='my-2'>
                            <input  {...register("uName",{value:user?.displayName})} defaultValue={user?.displayName} className="w-full p-2 outline-none border-b-2" readOnly/>
                        </div>
                        <div className='mb-2'>
                            <input type={'email'} {...register("uEmail",{value:user?.email})} defaultValue={user?.email} className="w-full p-2 outline-none border-b-2" readOnly/>

                        </div>
                        <div className='mb-2'>
                            <input {...register("uPhone",)} className="w-full p-2 outline-none border-b-2" placeholder='Phone Number'/>
                        </div>
                        <div className='mb-2'>
                            <textarea rows={3} {...register("uAddress",)} className="w-full p-2 outline-none border-b-2" placeholder='Your Address'/>
                        </div>
                        
                        <div className=''>
                            <input type="submit" value="Save"className="w-2/6 p-2 outline-none rounded-lg bg-[#605C3C] text-white cursor-pointer" />
                        </div>
                    </form>
                </div>
            </div>
            {/* update info */}
            <div className={`flex justify-left ${update?'block':'hidden'}`}>
                <div className="lg:w-3/6 md:w-1/2 w-full ">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <h3 className='text-xl text-[#605C3C] font-bold'>Update info</h3>
                        <div className='my-2'>
                            <input  {...register("name",{value:user?.displayName})} defaultValue={user?.displayName} className="w-full p-2 outline-none border-b-2" readOnly/>
                        </div>
                        <div className='mb-2'>
                            <input type={'email'} {...register("email",{value:user?.email})} defaultValue={user?.email} className="w-full p-2 outline-none border-b-2" readOnly/>

                        </div>
                        <div className='mb-2'>
                            <input {...register("phone",)} className="w-full p-2 outline-none border-b-2" placeholder='Phone Number' defaultValue={profileData?.phone}/>
                        </div>
                        <div className='mb-2'>
                            <textarea rows={3} {...register("address",)} className="w-full p-2 outline-none border-b-2" placeholder='Your Address' defaultValue={profileData?.address}/>
                        </div>
                        <div className=''>
                            <input type="submit" value="Update"className="w-2/6 p-2 outline-none rounded-lg bg-[#605C3C] text-white cursor-pointer" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;