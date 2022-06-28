import React from "react";
import Slider from "react-slick";
import Image from "next/dist/client/image";

import { dataPorsche } from "../utils/data";

// const settings = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 4,
//     initialSlide: 0,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: true,
//           dots: true
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1
//         }
//       }
//     ]
//   };


const Carousel = () => {
    
        return (
            <div className="Carousel-container">
                <Slider >
                {dataPorsche.map((item, index) => {
            <div className="card">
                <div className="card-top">
                    <Image src={item.image} alt="" key={index} />
                    <h1>{item.title}</h1>
                </div>
                    <div className="card-bottom"></div>
            </div>
                })}
                </Slider>
        </div>
        )
    
}

export default Carousel;
 
