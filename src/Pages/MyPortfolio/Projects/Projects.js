import React, { useEffect, useState } from 'react';
import Project from '../Project/Project';

const Projects = () => {
    const [projects,setProjects]=useState([])

    useEffect(()=>{
        fetch('projects.json')
            .then(res=>res.json())
            .then(data=>setProjects(data)) 
    },[])

    return (
        <div className='my-5'>
            <h3 className='lg:text-[48px] md:text-[48px] text-[35px] font-[700] text-[#BF7506] text-center'>Latest Projects</h3>
            <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5'>
                {
                    projects?.map(project=><Project key={project.id} project={project}/>)
                }
                

            </div>
            
        </div>
    );
};

export default Projects;