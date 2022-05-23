import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import CustomLink from '../../components/CustomLink/CustomLink';

const Dashboard = () => {
    return (
        <div className='w-5/6 mx-auto'>
            <div className='md:flex'>
                <div className="lg:w-1/6 md:w-2/6 w-full h-full shadow-md bg-white px-1">
                    <ul className="relative">
                        <li className="relative">
                            <Link className="flex items-center justify-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" to={'/dashboard/myprofile'} data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                <span>My Profile</span>
                            </Link>
                        </li>
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