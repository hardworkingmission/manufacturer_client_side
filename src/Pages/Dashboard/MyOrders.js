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
        })
            .then(res=>res.json())

    ))
    
    if(isLoading||loading){
        return <CustomSpinner/>
    }

    //delete an item
    const handleConfirm=(confirm)=>{
        if(confirm){
            setModalIsOpen(false)
            console.log(orderId)
            fetch(`http://localhost:5000/deleteOrder/${orderId}`,{
                method:"DELETE",
                headers:{
                    'content-type':'application/json',
                    authorization:`Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res=>res.json())
               .then(data=>{
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
            <div class="flex flex-col">
                <ToastContainer/>
                <CustomConfirm closeModal={closeModal}modalIsOpen={modalIsOpen}handleConfirm={handleConfirm}/>
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <table class="min-w-full">
                        <thead class="bg-white border-b font-bold">
                            <tr>
                                <th scope="col" class="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                </th>
                                <th scope="col" class="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                Image
                                </th>
                                <th scope="col" class="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                    Name
                                </th>
                                <th scope="col" class="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                    Price
                                </th>
                                <th scope="col" class="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                              orders?.map((order,index)=>(
                                <tr children={order._id} class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap">
                                        <img src={process.env.PUBLIC_URL+`/parts/${order.img}`} alt="" className='h-[50px] w-[50px] '/>
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap">
                                        {order.partsName}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap">
                                        ${order.totalPrice}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap ">
                                       <div className='flex items-center'>
                                            {
                                                order?.paid?(
                                                    <div className='text-center'>
                                                        <p className='text-white bg-green-600 p-2 rounded-lg w-3/6'>Paid</p>
                                                        <p className='flex flex-wrap'>TransactionId:{order?.transactionId}</p>
                                                     
                                                    </div>
                                                    ):(
                                                    <>
                                                    <FontAwesomeIcon role={'button'} icon={faCreditCard} className='text-lg text-green-400' onClick={()=>navigate(`myorders/payment/${order._id}`)}/>
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