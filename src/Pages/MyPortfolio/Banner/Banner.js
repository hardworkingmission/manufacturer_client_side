import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import BannerImg from '../../../images/shakil1.jpg'
import fb from '../../../images/fb.png'
import link from '../../../images/link.png'
import git from '../../../images/git.png'
import stack from '../../../images/stack.png'
import Cv from '../../../files/my_cv.pdf'

const Banner = () => {
    return (
        <div className='md:flex'>
            <div className='lg:w-5/12 md:w-6/12 w-full'>
                <img src={BannerImg} alt="" className='rounded-lg border-2'/>
            </div>
            <div className='lg:w-7/12 md:w-6/12 w-full flex items-center'>
                <div className='p-2'>
                    <h3 className='text-[#211B12] lg:text-[48px] md:text-[48px] text-[35px] font-[700]'>I'm Md. Shakil Shaikh</h3>
                    <p><span className='text-[#BF7506]'>Frontend Developer and Designer.</span> I learn and teach everything about Web Technologies and Product Design.</p>
                    <h3><span className='font-bold'>Email:</span><span className='italic text-sm'>sshakil496@gmail.com</span></h3>
                    <div className='lg:w-8/12 md:w-8/12 w-full flex justify-between items-center mt-5'>
                        <div>
                            <ul className='flex '>
                                <li className='mr-2'><a href="https://www.facebook.com/happniur.akter/" target="_blank" rel="noopener noreferrer"><img src={fb} alt="" className='h-[35px] w-[35px] rounded-[50%]'/></a></li>
                                <li className='mr-2'><a href="https://www.facebook.com/happniur.akter/" target="_blank" rel="noopener noreferrer"><img src={link} alt="" className='h-[35px] w-[35px] rounded-[50%]'/></a></li>
                                <li className='mr-2'><a href="https://www.facebook.com/happniur.akter/" target="_blank" rel="noopener noreferrer"><img src={git} alt="" className='h-[35px] w-[35px] rounded-[50%]'/></a></li>
                                <li className='mr-2'><a href="https://www.facebook.com/happniur.akter/" target="_blank" rel="noopener noreferrer"><img src={stack} alt="" className='h-[35px] w-[35px] rounded-[50%]'/></a></li>
                            </ul>
                        </div>
                        <div >
                            <div>
                                <a href={Cv} download="my_cv.pdf" ><FontAwesomeIcon icon={faFile} className="mr-2"/>Download CV</a>
                            </div>
                            <div className='h-[2px] w-full bg-[#BF7506]'>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
};

export default Banner;