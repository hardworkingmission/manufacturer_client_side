import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
import CustomSpinner from '../../../components/CustomSpinner/CustomSpinner'
import CustomConfirm from '../../../components/CustomConfirm/CustomConfirm'


const ManageProducts = () => {

    const [confirmIsOpen,setConfirmIsOpen]=useState(false)
    const [orderId,setOrderId]=useState('')
    const [orders,setOrders]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [refetch,setRefetch]=useState(false)
    useEffect(()=>{
        fetch('http://localhost:5000/allorders',{
                headers:{
                    "Content-Type":"application/json",
                    authorization:`Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res=>res.json())
              .then(data=>{
                  setIsLoading(false)
                  setOrders(data)
                })
    },[refetch])

    if(isLoading){
        return <CustomSpinner/>
    }

    //delete an order by admin
    const handleConfirm=(confirm)=>{

        if(confirm){
            setConfirmIsOpen(false)
            console.log('Order id',orderId)
            fetch(`http://localhost:5000/deleteOrderByAdmin/${orderId}`,{
                method:"DELETE",
                headers:{
                    'content-type':'application/json',
                    authorization:`Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res=>res.json())
               .then(data=>{
                   if(data.deletedCount===1){
                       toast.success('The Order is deleted successfully')
                       setRefetch(true)
                   }
               })

        }

    }
    const deleteOrder=(id)=>{
        setOrderId(id)
        setConfirmIsOpen(true)

    }
    const closeConfirm=()=>{
        setConfirmIsOpen(false)   
    }
    return (
        <div>
            <div className="flex flex-col">
                <ToastContainer/>
                <CustomConfirm closeModal={closeConfirm} modalIsOpen={confirmIsOpen} handleConfirm={handleConfirm}/>

                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                        <thead className="bg-white border-b font-bold">
                            <tr>
                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                </th>
                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                    Order Id
                                </th>
                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                Image
                                </th>
                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                    Product
                                </th>
                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                    Name
                                </th>
                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                    Price
                                </th>
                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                              orders?.map((order,index)=>(
                                <tr key={order?._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                                    <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-wrap">
                                       {order?._id}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-wrap">
                                        <img src={order?.img} alt="" className='h-[50px] w-[50px] '/>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-wrap">
                                        {order?.partsName}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-wrap">
                                        {order?.name}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-wrap">
                                        ${order?.totalPrice}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-wrap ">
                                        <div className='flex orders-center'>
                                            {
                                                order?.paid?(
                                                    <div className='text-center'>
                                                        <p className='text-white bg-green-600 p-2 rounded-lg w-3/6'>Paid</p>
                                                        <p className='flex flex-wrap'>TransactionId:{order?.transactionId}</p>
                                                     
                                                    </div>
                                                    ):(
                                                    <>
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

export default ManageProducts;