import React from 'react';

const Footer = () => {
    return (
        <div className='w-5/6 mx-auto p-5 bg-[#605C3C] text-white text-sm flex justify-center items-center'>
            <h3>Copyright &copy; {new Date().getFullYear()} xtremecomputers.com</h3>
        </div>
    );
};

export default Footer;