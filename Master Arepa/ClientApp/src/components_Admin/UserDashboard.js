import React from 'react';
import { Row, Col } from 'reactstrap';
import { useAuth0 } from "../react-auth0-wrapper";
import Preloader from '../components/Preloader';

function UserDashboard() {
    const { loading, user } = useAuth0();
    if (loading) {
        return <Preloader />;
    }
    var role = user[Object.keys(user)[0]];
    return (<React.Fragment>
        <section className="section bg-about bg-light-about bg-light" id="dashboard">
            <br />
            <br />
            <br />
            <Row className="align-items-center p-4">
                <Col md="6">
                    <div className="about-desc container">
                        <div className="title-heading p-4">
                            <h2 className="text-dark mb-1 font-weight-light text-uppercase">{role}</h2>
                        </div>
                        <div className="contact-box p-5">
                            <p className="text-muted f-20">Master Arepa Dashboard</p>
                        </div>
                    </div>
                </Col>

                <Col md="6">
                    <div className="about-img light-img position-relative p-4">
                        <img src="images/master.png" alt="" className="img-fluid mx-auto d-block" />
                    </div>
                </Col>
            </Row>
        </section>
    </React.Fragment>);
}

export default UserDashboard;