import React from 'react';
import { Link } from 'react-router-dom';
import error404 from '../../images/404notfound.png'

const NotFound = () => {
    return (
        <div className='w-5/6 mx-auto py-3'>
            <div className="error-img">
                <img src={error404} alt="" className='w-full h-[400px]' />
            </div>
            <div className="home-link text-center">
                <Link className='bg-blue-400 text-2xl font-bold py-3 px-4 rounded-lg text-white' to={'/'}>Back To Home</Link>
            </div>
            
        </div>
    );
};

export default NotFound;