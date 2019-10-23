import React from 'react';
import { Row, Col } from 'reactstrap';

function VisitorDashboard() {
    return (<section className="section bg-about bg-light-about bg-light" id="dashboard">
        <br />
        <br />
        <br />
        <Row className="align-items-center p-4">
            <Col md="6">
                <div className="about-desc container">
                    <div className="title-heading p-4">
                        <h2 className="text-dark mb-1 font-weight-light text-uppercase">Greetings Visitor</h2>
                    </div>
                    <div className="contact-box p-5">
                        <p className="text-muted f-20">Please email info@masterarepa.com in order to get access.</p>
                    </div>
                </div>
            </Col>

            <Col md="6">
                <div className="about-img light-img position-relative p-4">
                    <img src="images/master.png" alt="" className="img-fluid mx-auto d-block" />
                </div>
            </Col>
        </Row>
    </section>);
}

export default VisitorDashboard;