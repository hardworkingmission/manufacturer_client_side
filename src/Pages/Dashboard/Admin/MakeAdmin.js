import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomConfirm from '../../../components/CustomConfirm/CustomConfirm'


const ManageProducts = () => {

    const [confirmIsOpen,setConfirmIsOpen]=useState(false)
    const [userId,setUserId]=useState('')
    const [users,setUsers]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [refetch,setRefetch]=useState(false)
    useEffect(()=>{
        fetch('http://localhost:5000/allusers',{
                headers:{
                    "Content-Type":"application/json",
                    authorization:`Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res=>res.json())
              .then(data=>{
                  setIsLoading(false)
                  setUsers(data)
                })
    },[refetch])

    // if(isLoading){
    //     return <CustomSpinner/>
    // }

    //delete an order by admin
    const handleConfirm=(confirm)=>{

        if(confirm){
            setConfirmIsOpen(false)
            console.log('Order id',userId)
            const admin={role:"admin"}
            fetch(`http://localhost:5000/makeAdminByAdmin/${userId}`,{
                method:"PATCH",
                headers:{
                    'content-type':'application/json',
                    authorization:`Bearer ${localStorage.getItem('accessToken')}`
                },
                body:JSON.stringify(admin)
            }).then(res=>res.json())
               .then(data=>{
                       console.log(data)
                       toast.success('Admin is made successfully')
                       setRefetch(!refetch)
               })

        }

    }
    const makeAdmin=(id)=>{
        setUserId(id)
        setConfirmIsOpen(true)

    }
    const closeConfirm=()=>{
        setConfirmIsOpen(false)   
    }
    return (
        <div>
            <div className="flex flex-col">
                <ToastContainer/>
                <CustomConfirm closeModal={closeConfirm} modalIsOpen={confirmIsOpen} handleConfirm={handleConfirm}>
                    <h3>Do you want to make him Admin?</h3>
                </CustomConfirm>

                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                        <thead className="bg-white border-b font-bold">
                            <tr>
                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                </th>
                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                  Name
                                </th>
                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                  Email
                                </th>
                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                   Role
                                </th>                              
                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                              users?.map((user,index)=>(
                                <tr key={user?._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                                    <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-wrap">
                                       {user?.name}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-wrap">
                                        {user?.email}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-wrap">
                                        {user?.role==='admin'?<span className='font-bold text-green-600'>Admin</span>:<span className='text-red-600'>General User</span>}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-wrap ">
                                        <div className='flex orders-center'>
                                            {
                                                user?.role==='admin'?'':<button className='text-white font-bold bg-green-600 rounded-lg p-2' onClick={()=>makeAdmin(user._id)}>Make Admin</button>
                                            }
                                        </div>
                                       
                                    </td>
                                </tr>
                              ))
                          }
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;