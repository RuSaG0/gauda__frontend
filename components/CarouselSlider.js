import React from 'react';
import Carousel from "react-responsive-carousel";

class CarouselSlider extends React.Component{
    render(){
        return(
            <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
            <div>
                <img src="/static/img/butter.jpg" />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src="/static/img/butter.jpg" />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src="/static/img/butter.jpg" />
                <p className="legend">Legend 3</p>
            </div>
            <div>
                <img src="/static/img/butter.jpg" />
                <p className="legend">Legend 4</p>
            </div>
            <div>
                <img src="/static/img/butter.jpg" />
                <p className="legend">Legend 5</p>
            </div>
            <div>
                <img src="/static/img/butter.jpg" />
                <p className="legend">Legend 6</p>
            </div>
        </Carousel>
        );
    }
}
export default CarouselSlider;