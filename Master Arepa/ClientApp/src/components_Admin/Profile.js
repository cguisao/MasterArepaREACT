import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import Preloader from "../components/Preloader";
import { Row, Col} from 'reactstrap';

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <Preloader />;
  }

  return (
    <section className="section bg-light" id="contact">
        <br />
        <br />
        <br />
      <div className="container">
          <div className="row">
              <Col lg="12">
                  <div className="title-heading mb-5">
                      <h2 className="text-dark mb-1 font-weight-light text-uppercase">{user.name}</h2>
                  </div>
              </Col>
          </div>
          <Row>
              <Col lg="12">
                  <div className="contact-box p-5">
                      <Row>
                          <Col lg="8" md="6">
                              <div className="custom-form p-3">
                                Fill infor later..
                              </div>
                          </Col>
                      </Row>
                  </div>
              </Col>
          </Row>
      </div>
  </section>
  );
};

export default Profile;