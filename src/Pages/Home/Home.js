import React from 'react';
import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';
import BusinessSummary from '../BusinessSummary/BusinessSummary';
import Parts from '../Parts/Parts';
import Reviews from '../Reviews/Reviews';

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
                <BusinessSummary/>
            </section>
            <section className='client-reviews'>
                <Reviews/>
            </section>
        </div>
    );
};

export default Home;