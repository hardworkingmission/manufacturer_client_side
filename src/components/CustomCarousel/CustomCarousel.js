import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


const CustomCarousel = () => {
    const slides=[
        {id:1,img:'slide-1.jpg',title:'OUR BEST QUALITY SSD WILL MAKE COMPUTER FAST'},
        {id:2,img:'slide-2.jpg',title:'XTREME MOTHERBOARD IS THE BEST FOR GAMING '},
        {id:3,img:'slide-3.jpg',title:'OUR RAM IS 3 TIMES FASTER THAN OUR PREVIOUS GENERATION'},
        {id:4,img:'slide-4.jpg',title:'WE PRODUCT BEST QUALITY SUPER COMPUTER MOTHERBOARD'},
    ]
    return (
        <Carousel autoPlay={true} infiniteLoop interval={'4000'} verticalSwipe={'standard'}>
            {
                slides.map(slide=>(
                    <div key={slide.id}>
                        <img src={process.env.PUBLIC_URL+`/carousel/${slide.img}`} alt='' />
                        <p className="legend">{slide.title}</p>
                    </div>
                ))
            }         
        </Carousel>
    );
};

export default CustomCarousel;