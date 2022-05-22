import React from 'react';
import ReactStars from "react-rating-stars-component";

const Reviews = () => {
    const reviews=[
        {id:1,img:"client-1.jpg",user:"Willum Kocx",comment:"Good product.Wanted to like this laptop but I couldn’t get the issues with the Touch Bar to stop especially with non Apple apps. Using Chrome I had no way to turn up the volume or adjust brightness as all the touchbar would show is function keys.",ratings:4.5},
        {id:2,img:"client-2.jpg",user:"Jon Kerry",comment:"Good product.Wanted to like this laptop but I couldn’t get the issues with the Touch Bar to stop especially with non Apple apps. Using Chrome I had no way to turn up the volume or adjust brightness as all the touchbar would show is function keys.",ratings:5},
        {id:3,img:"client-3.jpg",user:"Vlamidir Putin",comment:"Bad product.Wanted to like this laptop but I couldn’t get the issues with the Touch Bar to stop especially with non Apple apps. Using Chrome I had no way to turn up the volume or adjust brightness as all the touchbar would show is function keys.",ratings:2.5},
        {id:4,img:"client-4.jpg",user:"Jemmy Lorens",comment:"Wanted to like this laptop but I couldn’t get the issues with the Touch Bar to stop especially with non Apple apps. Using Chrome I had no way to turn up the volume or adjust brightness as all the touchbar would show is function keys.",ratings:3.5},

    ]
    const shuffledReviews = reviews?.sort(() => 0.5 - Math.random());
    const selectedReviews=shuffledReviews?.slice(0,3)
    return (
        <div className='my-5'>
        <div className='text-center my-3'>
            <h3 className='text-3xl font-bold text-[#605C3C]'>Client Reviews</h3>
            <div className='h-[2px] w-full my-2 bg-[#605C3C] '></div>
        </div>
        <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-3 '>
            {
                selectedReviews?.map(review=>(
                    <div className='col rounded-lg shadow-lg text-center py-5 px-3' key={review.id}>
                        <div className="flex justify-center">
                            <img src={process.env.PUBLIC_URL+`/clients/${review.img}`} alt=""  className='h-[100px] w-[100px] rounded-[50%]'/>
                        </div>
                        <div className='text-[#605C3C] font-bold mt-2'>
                            {review.user}
                        </div>
                        <div className="summary mt-3 text-left">
                            <p className=''> 
                                <ReactStars
                                    count={5}
                                    value={review?.ratings}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                            </p>
                            <p className='italic text-sm'>"{review.comment}"</p>
                        </div>
                    </div>
                ))
            }

        </div>
    </div>
    );
};

export default Reviews;