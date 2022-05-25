import React, { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";

const Reviews = () => {
    const [reviews,setReviews]=useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/reviews')
           .then(res=>res.json())
           .then(data=>setReviews(data))

    },[])
    return (
        <div className='my-5'>
        <div className='text-center my-3'>
            <h3 className='text-3xl font-bold text-[#605C3C]'>Client Reviews</h3>
            <div className='h-[2px] w-full my-2 bg-[#605C3C] '></div>
        </div>
        <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-3 '>
            {
                reviews?.map((review,index)=>(
                    <div className='col rounded-lg shadow-lg py-5 px-3' key={index}>
                        <div className="summary mt-3 text-left">
                            <ReactStars
                                count={5}
                                value={parseFloat(review?.ratings)}
                                size={24}
                                activeColor="#ffd700"
                            />
                            <p className='italic text-sm'>"{review.comment}"</p>
                            <div className='text-[#605C3C] mt-2'>
                                <h3 className='font-bold'>{review.name}</h3>
                                <p>Address:{review.address}</p>
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    </div>
    );
};

export default Reviews;