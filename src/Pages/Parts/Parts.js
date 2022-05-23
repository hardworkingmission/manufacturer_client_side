import React from 'react';
import useParts from '../../hooks/useParts/useParts';
import PartsItem from './PartsItem';

const Parts = () => {
    const [parts,queryLoading,queryError,queryRefetch]=useParts()
    const shuffledParts = parts?.sort(() => 0.5 - Math.random());
    const selectedParts=shuffledParts?.slice(0,3)
    //console.log(parts)
    return (
        <div className='my-5'>
                <div>
                    <div className='text-center'>
                        <h3 className='text-3xl font-bold text-[#605C3C]'>Computer parts</h3>
                        <div className='h-[2px] w-full my-2 bg-[#605C3C] '></div>
                    </div>
                    
                    <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-3 mt-5'>
                        {
                            selectedParts?.map(item=><PartsItem key={item._id} item={item}/>)
                        }

                    </div>
                </div>
            
        </div>
    );
};

export default Parts;