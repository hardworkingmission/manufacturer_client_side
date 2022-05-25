import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe,faFlag,faUser,faComments } from '@fortawesome/free-solid-svg-icons'

const BusinessSummary = () => {
    const summaries=[
        {id:1,icon:faGlobe,title:"Continents",quantity:5},
        {id:2,icon:faFlag,title:"Countries",quantity:150},
        {id:3,icon:faUser,title:"Clients",quantity:750},
        {id:4,icon:faComments,title:"Feedbacks",quantity:1000},

    ]
    return (
        <div className='my-5'>
            <div className='text-center my-3'>
                <h3 className='text-3xl font-bold text-[#605C3C]'>Our Business Power</h3>
                <div className='h-[2px] w-full my-2 bg-[#605C3C] '></div>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3 '>
                {
                    summaries?.map(summary=>(
                        <div className='col text-center py-5' key={summary.id}>
                            <div className="icon text-[#605C3C] text-xl">
                                <FontAwesomeIcon icon={summary?.icon}/>
                            </div>
                            <div className="summary mt-3">
                                <h3 className='text-blue-600 fond-bold text-3xl'>{summary?.quantity}+</h3>
                                <p className='text-[#605C3C]'>{summary?.title}</p>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default BusinessSummary;