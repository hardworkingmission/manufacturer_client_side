import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import CustomLink from '../../components/CustomLink/CustomLink';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin/useAdmin';

const Dashboard = () => {
    const [user]=useAuthState(auth)
    const [admin,isAdminLoading,adminError]=useAdmin(user)
    if(isAdminLoading){
        return <CustomSpinner/>
    }
    console.log('Admin',admin.admin)
    return (
        <div className='w-5/6 mx-auto'>
            <div className='md:flex'>
                <div className="lg:w-1/6 md:w-2/6 w-full h-full shadow-md bg-white px-1">
                    <ul className="relative">
                        {
                            admin.admin?
                            <>
                                <li className="relative">
                                    <Link className="flex items-center justify-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" to={'/dashboard/addproduct'} data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                        <span>Add a Product</span>
                                    </Link>
                                </li>
                                <li className="relative">
                                    <Link className="flex items-center justify-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" to={'/dashboard/manageproducts'} data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                        <span>Manage Products</span>
                                    </Link>
                                </li>
                                <li className="relative">
                                    <Link className="flex items-center justify-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" to={'/dashboard/manageallorders'} data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                        <span>Manage All Orders</span>
                                    </Link>
                                </li>
                                <li className="relative">
                                    <Link className="flex items-center justify-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" to={'/dashboard/makeadmin'} data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                        <span>Make Admin</span>
                                    </Link>
                                </li>                               
                            </>:
                            <>
                                <li className="relative">
                                    <Link className="flex items-center justify-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" to={'/dashboard/myorders'} data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                        <span>My Orders</span>
                                    </Link>
                                </li>
                                <li className="relative">
                                    <Link className="flex items-center justify-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" to={'/dashboard/addreview'} data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                        <span>Add a Review</span>
                                    </Link>
                                </li>
                            </>
                        }
                          <li className="relative">
                                    <Link className="flex items-center justify-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" to={'/dashboard/myprofile'} data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                        <span>My Profile</span>
                                    </Link>
                                </li>


                    </ul>
                </div>
                <div className='lg:w-5/6 md:w-4/6 w-full h-full p-2'>
                    <Outlet/>

                </div>

            </div>
            
        </div>
    );
};

export default Dashboard;