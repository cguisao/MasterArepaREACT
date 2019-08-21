import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class AboutSection extends React.Component {

    render() {

        return (
            <React.Fragment>
                <section className="section bg-about bg-light-about bg-light" id="about">
                    <div className="container">
                        <Row>
                            <Col lg="4">
                                <div className="title-heading mb-5">
                                    <h3 className="text-dark mb-1 font-weight-light text-uppercase">About Us</h3>
                                    <div className="title-border-simple position-relative"></div>
                                </div>
                            </Col>
                        </Row>

                        <Row className="align-items-center mt-5">
                            <Col md="6">
                                <div className="about-desc">
                                    <h3 className="text-dark mb-3 font-weight-light">Our Story..</h3>
                                    <p className="text-muted f-15">
                                        Master Arepa is a Colombian/Mexican fusion food truck that serves 
                                        100% corn arepas and tortillas in south Florida. At Master Arepa passion
                                        is the most important ingredient, and we bring you the beauty of Colombian
                                        and Mexican flavours in every bite.
                                    </p>
                                </div>
                            </Col>

                            <Col md="6">
                                <div className="about-img light-img position-relative p-4">
                                    <img src="images/burger.jpg" alt="" className="img-fluid mx-auto d-block" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default AboutSection;