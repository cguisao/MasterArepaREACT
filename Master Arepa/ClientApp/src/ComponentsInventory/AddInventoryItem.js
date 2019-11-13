import React from "react";
import { Row, Col, Form, Input, Label, Button } from 'reactstrap';
import { useAuth0 } from "../react-auth0-wrapper";
import NotAuthenticated from "../components_Admin/NotAuthenticated";
import Preloader from "../components/Preloader";
import { Container } from "react-bootstrap";
import handleSubmit from "../componentsAPI/submitItem";
import InventoryList from "../ComponentsInventory/InventoryList";

function AdminInventory(){
    
    return (
        <React.Fragment>
            <Col>
                <div className="title-heading mb-5">
                    <h2 className="text-dark mb-1 font-weight-light text-uppercase">Add Inventory Item</h2>
                </div>
            </Col>
                <Row>
                    <Col>
                        <div className="contact-box p-5">
                            <Row>
                                <Col lg="8" md="6">
                                    <div className="custom-form p-3">
                                    <div id="message"></div>
                                        <Form onSubmit={handleSubmit("api/Admin/AddItem")}>
                                            <Col sx="3">
                                                <Label htmlFor="item">Item</Label>
                                                <Input type="text" name="Item" id="Item" required="true" placeholder="New Item" />
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

function AddItem(){
    
    const { loading, isAuthenticated, user } = useAuth0();

    if (loading) {
        return <Preloader />;
    }

    if(!isAuthenticated){
        return <NotAuthenticated />;
    }

    var role = user[Object.keys(user)[0]];

    if(isAuthenticated && role == "Admin"){
        return (
            <React.Fragment>
                <section className="section bg-about bg-light-about bg-light" id="FoodTruckInventory">
                    <Container>
                        <Row>
                            <Col><AdminInventory /></Col>
                            <Col><InventoryList /></Col>
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

export default AddItem;