import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import {Grid, Row} from 'react-bootstrap';
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
    {images.map(image => (
      <div>
        <img src={image} alt="something valueable" />
      </div>
    ))}
  </Slider>
);

export default ImageCarousel;
