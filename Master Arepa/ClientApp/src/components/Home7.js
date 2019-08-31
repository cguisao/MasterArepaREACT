import React from 'react';
import { Row, Col } from 'reactstrap';
import Typing from 'react-typing-animation';
import BackgroundSlideshow from 'react-background-slideshow'

import image1 from './images/master.jpg';

class Home7 extends React.Component {
    
    render() {

        return (
            <React.Fragment>
                <section className="home-7-bg bg-foodTruck" id="home">
                <div className="bg-overlay" style={{ zIndex : "1" }}></div>
                  
                    <div className="home-center" id="contentSlider">
                        <div className="home-desc-center">
                            <div className="container">
                                <Row className="justify-content-center">
                                    <Col lg="8">
                                        <div className="mt-40 text-center home-5-content">
                                            <Typing speed={50}>
                                                <h1  className="text-white font-weight-light home-7-title mb-0"> 
                                                    <span className="element">Welcome to Master Arepa</span>
                                                </h1>
                                                <Typing.Reset count={1} delay={1000} />
                                                <h1  className="text-white font-weight-light home-7-title mb-0"> 
                                                    <span className="element">We love Colombian Arepas</span>
                                                </h1>
                                               <Typing.Reset count={1} delay={1000} />
                                                <h1  className="text-white font-weight-light home-7-title mb-0"> 
                                                    <span className="element"> And Mexican Tacos</span>
                                                </h1>
                                                <Typing.Reset count={1} delay={1000} />
                                                <h1  className="text-white font-weight-light home-7-title mb-0"> 
                                                    <span className="element"> Specially, we love food..</span>
                                                </h1>
                                            </Typing>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                 
                </section>
            </React.Fragment>
        );
    }
}
export default Home7;