import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome} from '@fortawesome/free-solid-svg-icons'
import MyGoogleMap from '../../components/MyGoogleMap/MyGoogleMap';

const ContactUs = () => {
    return (
        <div className='my-5 '>
            <div className='title my-3'>
                <div className='text-center '>
                    <h3 className='text-3xl font-bold text-[#605C3C]'>Contact Us</h3>
                    <div className='h-[2px] w-full my-2 bg-[#605C3C] '></div>
                </div>
                <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-3 '>
                </div>
            </div>
            <div className='contact-info md:flex'>
                <div className="lg:w-4/12 md:w-5/12 w-full bg-gray-100 p-5">
                    <h3 className='text-[#605C3C] text-3xl text-center my-3'><FontAwesomeIcon icon={faHome}/></h3>
                    <h3><span className='text-[#605C3C] font-bold'>Contact Number:</span> +055-3453455,+123-1414415</h3>
                    <h3><span className='text-[#605C3C] font-bold'>Address:</span> 350 Glover Greens Suite 677</h3>
                    <h3><span className='text-[#605C3C] font-bold'>State:</span> New Mexico</h3>
                    <h3><span className='text-[#605C3C] font-bold'>Country:</span> USA</h3>
                </div>
                <div className="lg:w-8/12 md:w-7/12 w-full">
                    <MyGoogleMap/>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;