import React, { Component } from 'react';
import { Carousel } from 'antd';

class MyCarousel extends Component {
    render() {
        return (
            <Carousel autoplay>
                <div>
                    <img src={require('../assets/carousel/book1.jpg')} alt="carousel-1" />
                </div>
                <div>
                    <img src={require('../assets/carousel/book2.jpg')} alt="carousel-1" />

                </div>
                <div>
                    <img src={require('../assets/carousel/book3.jpg')} alt="carousel-1" />

                </div>
                <div>
                    <img src={require('../assets/carousel/book4.jpg')} alt="carousel-1" />

                </div>
            </Carousel>
        );
    }
}

export default MyCarousel;
