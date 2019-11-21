import React from "react";
import handleSubmit from "../componentsAPI/submitItem";
import { Row, Col, Form, Input, Label, Button } from 'reactstrap';

function AddOtherItem(){
    
    return (
        <React.Fragment>
            <Col>
                <div className="title-heading mb-5">
                    <h2 className="text-dark mb-1 font-weight-light text-uppercase">Add Additional Inventory Item</h2>
                </div>
            </Col>
                <Row>
                    <Col>
                        <div className="contact-box p-5">
                            <Row>
                                <Col lg="8" md="6">
                                    <div className="custom-form p-3">
                                    <div id="message"></div>
                                        <Form onSubmit={handleSubmit("api/Admin/AddAdditionalItemType")}>
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
    
export default AddOtherItem;