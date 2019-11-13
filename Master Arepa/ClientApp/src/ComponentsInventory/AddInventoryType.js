import React from "react";
import { Row, Col, Form, Input, Label, Button, Container } from 'reactstrap';
import handleSubmit from "../componentsAPI/submitItem";
import { useAuth0 } from "../react-auth0-wrapper";
import NotAuthenticated from "../components_Admin/NotAuthenticated";
import Preloader from "../components/Preloader";
import TypeList from "./TypeList";

function AddType() {
    return (
        <React.Fragment>
            <Col>
                <div className="title-heading mb-5">
                    <h2 className="text-dark mb-1 font-weight-light text-uppercase">Add Inventory Type</h2>
                </div>
            </Col>
            <Row>
                <Col>
                    <div className="contact-box p-5">
                        <Row>
                            <Col lg="8" md="12">
                                <div className="custom-form p-3">
                                <div id="message"></div>
                                    <Form onSubmit={handleSubmit("api/Admin/AddItemType")}>
                                        <Col>
                                            <Label htmlFor="Type">Type</Label>
                                            <Input type="text" name="Type" id="Type" required="true" placeholder="New Type" />
                                        </Col>
                                        <br />
                                        <Col>
                                            <Button color="primary">Submit</Button>
                                        </Col>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}

function AddInventoryType() {
    
    const { loading, isAuthenticated, user } = useAuth0();

    if (loading) {
        return <Preloader />;
    }

    if(!isAuthenticated){
        return <NotAuthenticated />;
    }

    var role = user[Object.keys(user)[0]];

    if(isAuthenticated && role == "Admin"){
        return(
            <React.Fragment>
                <section className="section bg-about bg-light-about bg-light" id="AddInventoryType">
                    <Container>
                        <Row>
                            <Col><AddType /></Col>
                            <Col><TypeList/></Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
    else{
        return <NotAuthenticated />;
    }
}

export default AddInventoryType;