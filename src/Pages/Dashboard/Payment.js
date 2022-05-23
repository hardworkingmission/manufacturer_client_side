import React from 'react';
import { useParams } from 'react-router-dom';

const Payment = () => {
    const {id}=useParams()
    return (
        <div className='w-5/6 mx-auto'>
            <h3>Payment{id}</h3>
        </div>
    );
};

export default Payment;