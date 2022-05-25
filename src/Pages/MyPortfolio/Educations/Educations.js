import React from 'react';

const Educations = () => {
    return (
        <div>
            <h3 className='lg:text-[48px] md:text-[48px] text-[35px] font-[700] text-[#BF7506] text-center'>Educations</h3>
            <div>
               <div className='flex my-2'>
                   <h3>2014-2017</h3>
                   <div className='ml-2'>
                        <p><span className='font-bold text-lg text-[#BF7506]'>Computer Science and Engineering</span>, <span className='italic'>Bangabandhu Sheikh Mujibur Rahman Science and Technology University, Gopalganj</span></p>
                        <h2>Medium of instruction English</h2>
                   </div>
               </div>
               <div className='flex my-2'>
                   <h3>2011-2012</h3>
                   <div className='ml-2'>
                        <p><span className='font-bold text-lg text-[#BF7506]'>Higher Secondary School Certificate</span>, <span className='italic'>Govt.B L College, Daulatpur,Khulna</span></p>
                        <h2>Medium of instruction Bengali</h2>
                   </div>
               </div>
               <div className='flex my-2'>
                   <h3>2009-2010</h3>
                   <div className='ml-2'>
                        <p><span className='font-bold text-lg text-[#BF7506]'>Secondary School Certificate</span>, <span className='italic'>Govt.Laboratory High School, KUET Rd, Khulna</span></p>
                        <h2>Medium of instruction Bengali</h2>
                   </div>
               </div>
            </div>
            
        </div>
    );
};

export default Educations;