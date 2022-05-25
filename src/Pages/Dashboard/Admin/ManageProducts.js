import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init'
import useParts from '../../../hooks/useParts/useParts';
import CustomSpinner from '../../../components/CustomSpinner/CustomSpinner'
import CustomConfirm from '../../../components/CustomConfirm/CustomConfirm'
import UpdateProduct from './UpdateProduct';
import CustomModal from '../../../components/CustomModal/CustomModal'

const ManageProducts = () => {
    const [user, loading, authError] = useAuthState(auth);
    const [confirmIsOpen,setConfirmIsOpen]=useState(false)
    const [modalIsOpen,setModalIsOpen]=useState(false)
    const [partsId,setPartsId]=useState('')
    const [productId,setProductId]=useState('')
    const navigate=useNavigate()

   const [parts,queryLoading,queryError,queryRefetch]=useParts()
    
    if(queryLoading||loading){
        return <CustomSpinner/>
    }

    //delete an item
    const handleConfirm=(confirm)=>{
        if(confirm){
            setConfirmIsOpen(false)
            console.log(partsId)
            fetch(`http://localhost:5000/deleteParts/${partsId}`,{
                method:"DELETE",
                headers:{
                    'content-type':'application/json',
                    authorization:`Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res=>res.json())
               .then(data=>{
                   if(data.deletedCount===1){
                       toast.success('The parts is deleted successfully')
                       queryRefetch()
                   }
               })

        }

    }
    const deleteProduct=(id)=>{
        setPartsId(id)
        setConfirmIsOpen(true)

    }
    const updateProduct=(id)=>{
        setProductId(id)
        setModalIsOpen(true)


    }
    const closeConfirm=()=>{
        setConfirmIsOpen(false)
        
    }
    const closeModal=()=>{
        setModalIsOpen(false)
        
    }
    return (
        <div>
            <div className="flex flex-col">
                <ToastContainer/>
                <CustomConfirm closeModal={closeConfirm} modalIsOpen={confirmIsOpen} handleConfirm={handleConfirm}/>
                <CustomModal closeModal={closeModal} modalIsOpen={modalIsOpen}>
                      <UpdateProduct id={productId} closeModal={closeModal}/>
                </CustomModal>
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
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                              parts?.map((item,index)=>(
                                <tr key={item?._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap">
                                        <img src={item?.img} alt="" className='h-[50px] w-[50px] '/>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap">
                                        {item?.name}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap">
                                        ${item?.price}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap ">
                                       <div className='flex items-center'>
                                            
                                                    <FontAwesomeIcon role={'button'} icon={faEdit} className='text-lg text-green-400' onClick={()=>updateProduct(item._id)}/>
                                                    <FontAwesomeIcon role={'button'} icon={faTrash} className='text-lg text-red-600 ml-5' onClick={()=>deleteProduct(item._id)}/>
                                                    
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