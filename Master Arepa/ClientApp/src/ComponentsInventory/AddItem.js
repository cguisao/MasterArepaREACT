import React, { useState } from "react";
import { Row, Col, Form, Input, Label, Button } from 'reactstrap';

function handleSubmit(event) {

    event.preventDefault();
    const data = new FormData(event.target);
    
    fetch('api/Form/AddItem', {
        method: 'POST', 
        body: data,
    }).then((result) => {
        console.log(result.text);
        alert("Item has been added successfully!");
        window.location.reload(true);
    }).catch(err => console.error(err))
}

function AddItem(){
    
    return (
        <section className="section bg-light" id="contact">
        <br />
        <br />
        <br />
      <div className="container">
          <div className="row">
              <Col lg="12">
                  <div className="title-heading mb-5">
                      <h2 className="text-dark mb-1 font-weight-light text-uppercase">Add Item</h2>
                  </div>
              </Col>
          </div>
          <Row>
              <Col lg="12">
                  <div className="contact-box p-5">
                      <Row>
                          <Col lg="8" md="6">
                              <div className="custom-form p-3">
                              <div id="message"></div>
                                <Form onSubmit={handleSubmit}>
                                    <Col sx="3">
                                        <Label htmlFor="email">Item</Label>
                                        <Input type="text" name="Item" id="Item" placeholder="New Item" />
                                    </Col>
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
      </div>
  </section>
    );
}

export default AddItem;