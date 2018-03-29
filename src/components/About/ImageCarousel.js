import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './slider.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const ImageCarousel = ({images}) => (
  <Slider {...settings}>
    {images &&
      images.map((image, index) => (
        <div key={index}>
          <img src={image} alt="something valueable" />
        </div>
      ))}
  </Slider>
);

export default ImageCarousel;
