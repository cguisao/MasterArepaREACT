import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import Preloader from "../components/Preloader";
import { Row, Col} from 'reactstrap';

const Profile = () => {
    const { loading, user } = useAuth0();

  if (loading || !user) {
    return <Preloader />;
  }

  var role = user[Object.keys(user)[0]];
  if(role == "") {role = "Visitor"}
  return (
    <section className="section bg-light" id="contact">
      <div className="container">
          <Row>
             <Col lg="12">
                  <div className="title-heading mb-5">
                      <h2 className="text-dark mb-1 font-weight-light text-uppercase">{role} Information</h2>
                  </div>
              </Col>
              <Col lg="12">
                  <div className="contact-box p-5">
                      <Row>
                          <Col lg="12" md="6">
                            <p className="mb-0 f-13"><b>Name: </b>{user.name}</p>
                            <p className="mb-0 f-13"><b>Email: </b>{user.email}</p>
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