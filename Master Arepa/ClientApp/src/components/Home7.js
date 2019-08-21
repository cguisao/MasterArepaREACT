import React from 'react';
import { Row, Col } from 'reactstrap';
import Typing from 'react-typing-animation';
import BackgroundSlideshow from 'react-background-slideshow'

import image1 from './images/logo.jpg';
import image2 from './images/tacos.jpg';
import image3 from './images/master.jpg';

class Home7 extends React.Component {
    
    render() {

        return (
            <React.Fragment>
                <section className="home-7-bg back-slide" id="home">
                <div className="bg-overlay" style={{ zIndex : "1" }}></div>
                <BackgroundSlideshow  images={[ image1, image2, image3 ]} />
                  
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
                                                    <span className="element">Because if you like Colombian and Mexican street food</span>
                                                </h1>
                                               <Typing.Reset count={1} delay={1000} />
                                                <h1  className="text-white font-weight-light home-7-title mb-0"> 
                                                    <span className="element"> You will love us.</span>
                                                </h1>
                                            </Typing>
                                        </div>
                                        <p className="text-white-70 font-weight-light mt-4 f-15 mb-0">
                                            We are located a different location everyday, follow us on Instagram or Facebook 
                                            for more details on where we are located today!!                                            
                                        </p>
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