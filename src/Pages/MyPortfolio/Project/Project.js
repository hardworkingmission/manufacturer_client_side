import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode,faCheck } from '@fortawesome/free-solid-svg-icons'
import CustomModal from '../CustomModal/CustomModal';

const Project = ({project}) => {
    const [modalIsOpen,setModalIsOpen]=useState(false)
    const {img,title,description,tags,codeLink,demoLink}=project
    const closeModal=()=>{
        setModalIsOpen(false)
    }
    return (
        <div>
            <CustomModal closeModal={closeModal}modalIsOpen={modalIsOpen}>
                <ul className='flex justify-center items-center'>
                   <li className='mr-2'><a className='p-1 bg-[#BF7506] text-white rounded-lg' href={codeLink?.link[0]} target="_blank" rel="noopener noreferrer">{codeLink?.linkTitle[0]}</a></li>
                   {
                       codeLink?.link[1]&&
                       <li><a className='p-1 bg-[#BF7506] text-white rounded-lg' href={codeLink?.link[1]} target="_blank" rel="noopener noreferrer">{codeLink?.linkTitle[1]}</a></li>
                   }
                    
                </ul>
            </CustomModal>
            <div className="col">
                <div className="project-img">
                    <img src={process.env.PUBLIC_URL+`/images/projects/${img}`} alt="" />
                </div>
                <div className='p-3'>
                    <h3 className='text-[24px] font-[700] text-[#BF7506] my-2'>{title}</h3>
                    <ul className='flex flex-wrap my-2'>
                        {
                            tags.map((tag,index)=>(
                                <li key={index} className="p-1 border border-[#BF7506] mr-1 rounded-lg">{tag}</li>
                            ))
                        }
                    </ul>
                    <p className='text-[16px] my-2'>{description}</p>
                    <div className='flex items-center gap-2'>
                        <div>
                            <button className='bg-[#BF7506] text-white p-2 rounded-lg' onClick={()=>setModalIsOpen(true)}><FontAwesomeIcon icon={faCode} className="mr-2"/>Code</button>
                        </div>
                        <div>
                            <a className='bg-[#BF7506] text-white p-3 rounded-lg' href={demoLink} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faCheck} className="mr-2"/>Demo</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Project;