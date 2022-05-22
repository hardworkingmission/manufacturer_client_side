import React from 'react';
import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';
import Parts from '../Parts/Parts';

const Home = () => {
    return (
        <div className='w-5/6 mx-auto'>
            <section className='carousel'>
                <CustomCarousel/>
            </section>
            <section className='parts'>
                <Parts/>
            </section>
            <section className='business-summary'>

            </section>
        </div>
    );
};

export default Home;