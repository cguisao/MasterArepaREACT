import React from 'react';
import { Row, Col } from 'reactstrap';

function Dashboard(){
    return(
        <section className="section bg-about bg-light-about bg-light" id="dashboard">
            < br/>
            < br/>
            < br/>
            <Row className="align-items-center p-4">
                <Col md="6">
                    <div className="about-desc container">
                        <div className="title-heading p-4">
                            <h2 className="text-dark mb-1 font-weight-light text-uppercase">Master Arepa Dashboard</h2>
                        </div>
                        <p className="text-muted f-20">
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
    );
}

export default Dashboard;