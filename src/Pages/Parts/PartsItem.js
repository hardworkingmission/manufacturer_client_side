import React from 'react';

const PartsItem = ({item}) => {
    const{_id,name,img,description,minQuantity,availableQuantity,price}=item
    console.log(item)
    return (
        <div className='col shadow-lg relative rounded-lg'>
            <div className="item-img">
                <img src={process.env.PUBLIC_URL+`/parts/${img}`} alt="" />
            </div>
            <div className='item-info p-2 mb-[50px]'>
                <h3 className='font-bold text-lg mb-2'>{name}</h3>
                <p><span className='font-bold mb-2'>Specification:</span> {description}</p>
                <h4><span className='font-bold mb-2'>Minimum Quantity:</span> {minQuantity}</h4>
                <h4><span className='font-bold mb-2'>Available Quantity:</span> {availableQuantity}</h4>
                <h4><span className='font-bold mb-2'>Price:</span> ${price}</h4>
            </div>
            <div className='flex justify-center '>
                <button className='bg-[#605C3C] rounded-lg text-white text-lg w-1/2 p-1 absolute bottom-2' >Place Order</button>
            </div>
            
        </div>
    );
};

export default PartsItem;