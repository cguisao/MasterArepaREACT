import React from 'react';
import { Row, Col } from 'reactstrap';

class AboutSection extends React.Component {

    render() {

        return (
            <React.Fragment>
                <section className="section bg-about bg-light-about bg-light" id="about">
                    <Row className="align-items-center p-4">
                        <Col md="6">
                            <div className="about-desc container">
                                <div className="title-heading p-4">
                                    <h2 className="text-dark mb-1 font-weight-light text-uppercase">About Us</h2>
                                </div>
                                <p className="text-muted f-20">
                                    Master Arepa is a Colombian/Mexican fusion food truck that serves 
                                    100% corn arepas and tortillas in south Florida. At Master Arepa, passion
                                    is the most important ingredient, we bring you the beauty of Colombian
                                    and Mexican flavours in every bite.
                                </p>
                            </div>
                        </Col>

                        <Col md="6">
                            <div className="about-img light-img position-relative p-4">
                                <img src="images/master.png" alt="" className="img-fluid mx-auto d-block" />
                            </div>
                        </Col>
                    </Row>
                </section>
            </React.Fragment>
        );
    }
}
export default AboutSection;