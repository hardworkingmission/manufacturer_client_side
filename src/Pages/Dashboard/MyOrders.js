import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faCreditCard } from '@fortawesome/free-solid-svg-icons'
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';
import auth from '../../firebase.init';
import useParts from '../../hooks/useParts/useParts';

const MyOrders = () => {
    const [user, loading, authError] = useAuthState(auth);

    const {data:orders,isLoading,error}=useQuery('orders',()=>(
        fetch(`http://localhost:5000/orders?user=${user?.email}`)
            .then(res=>res.json())

    ))
    // const[parts,queryLoading,queryError,queryRefetch]=useParts()
    // const partsId=orders?.map(order=>order?.partsId)
    // const orderedParts=partsId?.map(id=>parts?.find(part=>part?._id===id))
    
    if(isLoading||loading){
        return <CustomSpinner/>
    }
    return (
        <div>
            <div class="flex flex-col">
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
                                            <FontAwesomeIcon role={'button'} icon={faCreditCard} className='text-lg text-green-400'/>
                                            <FontAwesomeIcon role={'button'} icon={faTrash} className='text-lg text-red-600 ml-5'/>
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