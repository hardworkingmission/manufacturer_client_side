import React from 'react';
import {Helmet} from 'react-helmet-async'
import Banner from './Banner/Banner';
import Contact from './Contact/Contact';
import Educations from './Educations/Educations';
import Projects from './Projects/Projects';
import Technologies from './Technologies/Technologies';
//import Contact from '../Contact/Contact';

const MyPortfolio = () => {
    return (
        <div className='w-5/6 mx-auto'>
            <Helmet>
                <title>My Portfolio</title>
            </Helmet>
            <section className='banner'>
                <Banner/>
            </section>
            <section>
                <Projects/>
            </section>
            <section>
                <Educations/>
            </section>
            <section>
                <Technologies/>
            </section>
            <section>
                <Contact/>
            </section>
            <section>

            </section>
        </div>
    );
};

export default MyPortfolio;