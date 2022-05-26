import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faCreditCard } from '@fortawesome/free-solid-svg-icons'
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';
import auth from '../../firebase.init';
import CustomConfirm from '../../components/CustomConfirm/CustomConfirm'
import { useNavigate } from 'react-router-dom';
import { Helmet} from 'react-helmet-async';
import { signOut } from 'firebase/auth';

const MyOrders = () => {
    const [user, loading, authError] = useAuthState(auth);
    const [modalIsOpen,setModalIsOpen]=useState(false)
    const [orderId,setOrderId]=useState('')
    const navigate=useNavigate()

    const {data:orders,isLoading,error,refetch}=useQuery('orders',()=>(
        fetch(`http://localhost:5000/orders?user=${user?.email}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res=>{
                if(res.status===403||res.status===401){
                    signOut(auth)
                    navigate('/login')

                }
                return res.json()
            })

    ))
    
    if(isLoading||loading){
        return <CustomSpinner/>
    }

    //delete an item
    const handleConfirm=(confirm)=>{
        if(confirm){
            setModalIsOpen(false)
            console.log(orderId)
            fetch(`http://localhost:5000/deleteOrderByUser/${orderId}`,{
                method:"DELETE",
                headers:{
                    'content-type':'application/json',
                    authorization:`Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res=>{
                if(res.status===403||res.status===401){
                    signOut(auth)
                    navigate('/login')

                }
                return res.json()
            }).then(data=>{
                   if(data.deletedCount===1){
                       toast.success('The order is deleted successfully')
                       refetch()
                   }
               })

        }

    }
    const deleteOrder=(id)=>{
        setOrderId(id)
        setModalIsOpen(true)

    }
    const closeModal=()=>{
        setModalIsOpen(false)
        
    }
    return (
        <div>
            <div className="flex flex-col">
                <ToastContainer/>
                <Helmet>
                    <title>My Orders</title>
                </Helmet>
                <CustomConfirm closeModal={closeModal}modalIsOpen={modalIsOpen}handleConfirm={handleConfirm}>
                  <h3>Do you want to delete it?</h3>
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
                                Image
                                </th>
                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                    Name
                                </th>
                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                    Price
                                </th>
                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                    Status
                                </th>
                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                              orders?.map((order,index)=>(
                                <tr key={order._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap">
                                        <img src={order.img} alt="" className='h-[50px] w-[50px] '/>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap">
                                        {order.partsName}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap">
                                        ${order.totalPrice}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap">
                                        <div className='flex items-center'>
                                            {
                                                order?.status==='pending'?<span className='fond-bold text-red-600'>Pending</span>
                                                :''
                                                
                                            }
                                            {
                                                order?.status==='shipped'?<span className='fond-bold text-green-600'>Shipped</span>
                                                :''
                                            }

                                        </div>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap ">
                                       <div className='flex items-center'>
                                            {
                                                order?.paid?(
                                                    <div className='text-center'>
                                                        <p className='text-white bg-green-600 p-2 rounded-lg w-3/6'>Paid</p>
                                                        <p className='flex flex-wrap'>TransactionId:{order?.transactionId}</p>
                                                     
                                                    </div>
                                                    ):(
                                                    <>
                                                    <FontAwesomeIcon role={'button'} icon={faCreditCard} className='text-lg text-green-400' onClick={()=>navigate(`/dashboard/payment/${order._id}`)}/>
                                                    <FontAwesomeIcon role={'button'} icon={faTrash} className='text-lg text-red-600 ml-5' onClick={()=>deleteOrder(order._id)}/>
                                                    </>
                                                )
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

export default MyOrders;