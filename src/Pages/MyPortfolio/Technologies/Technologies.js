import React from 'react';

const Technologies = () => {
    const technologies=[
        {id:1,items:'HTML, CSS, BOOTSTRAP',progress:90},
        {id:2,items:'JAVASCRIPT, REACTJS, NEXTJS',progress:80},
        {id:3,items:'MySQL, PostGreSQL, MongoDb',progress:80}
    ]
    return (
        <div className='lg:w-4/6 md:w-4/6 w-full  mx-auto '> 
            <h3 className='lg:text-[48px] md:text-[48px] text-[35px] font-[700] text-[#BF7506] text-center'>Technologies</h3>
            <div className='my-5'>
                <div className='my-5 flex-col justify-center flex-wrap'>
                    {
                        technologies.map(technology=>(
                            <div key={technology.id}>
                                <>
                                    <div className=''>
                                    {technology.items}
                                    </div>
                                    <div className=" bg-gray-200 h-5 mb-6 rounded-lg">
                                        <div className={`bg-[#BF7506] h-5 w-[] justify-center text-white flex items-center rounded-lg`} style={{'width':`${technology?.progress&&parseInt(technology.progress)}%`}} >{technology.progress}%</div>
                                    </div>
                                </>
                               
                            </div>
                        ))
                    }

                </div>
            </div>
           
        </div>
    );
};

export default Technologies;