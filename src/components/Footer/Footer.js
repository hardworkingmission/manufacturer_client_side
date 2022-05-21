import React from 'react';

const Footer = () => {
    return (
        <div className='w-5/6 mx-auto p-5 bg-gray-300 text-sm flex justify-center items-center'>
            <h3>Copyright &copy; {new Date().getFullYear()} laptopinventory</h3>
        </div>
    );
};

export default Footer;