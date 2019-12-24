import React, { useEffect, useState } from "react";
import handleSubmit from "../componentsAPI/submitItem";
import { Row, Col, Form, Input, Label, Button, FormGroup } from 'reactstrap';
import { Container } from "react-bootstrap";
import { useAuth0 } from "../react-auth0-wrapper";
import NotAuthenticated from "../components_Admin/NotAuthenticated";
import Preloader from "../components/Preloader";

const CookingInventory = () => {

    const [setErrors] = useState(false);
    const [data, setItems] = useState({});
  
    useEffect(() => {
        async function fetchData() {
          const res = await fetch("api/Admin/GetInventoryItem");
          res
            .json()
            .then(res => setItems(res))
            .catch(err => setErrors(err));
        }
    
        fetchData();
      });

    const { loading, isAuthenticated, user } = useAuth0();

    if (loading) {
        return <Preloader />;
    }
    
    if(!isAuthenticated){
        return <NotAuthenticated />;
    }

    var role = user[Object.keys(user)[0]];

    return (
        <React.Fragment>
            <section className="section bg-about bg-light-about bg-light" id="FoodTruckInventory">
                <Container>
                    <Col>
                        <div className="title-heading mb-5">
                            <h2 className="text-dark mb-1 font-weight-light text-uppercase">Add Cooking Inventory Item</h2>
                        </div>
                    </Col>
                        <Row>
                            <Col>
                                <div className="contact-box p-5">
                                    <Row>
                                        <Col lg="12" md="6">
                                            <div className="custom-form p-3">
                                            <div id="message"></div>
                                                <Form onSubmit={handleSubmit("api/Inventory/HomeInventory")}>
                                                    <FormGroup row>
                                                        <Label for="select" sm={3}>Inventory Type</Label>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Col sm={6}>
                                                            <Input type="select" name="InventoryType" id="InventoryType">
                                                                {Object.values(data).map(typeItem => <option>{typeItem.item}</option>)}
                                                            </Input>
                                                        </Col>
                                                        <Col sm={6}>
                                                            <Input type="number" name="item" id="Item" required="true" placeholder="New Inventory" required/>
                                                        </Col>
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup>
                                                        <Input type="hidden" value={user.name} name="User" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Input type="hidden" value={role} name="Role" />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Col>
                                                            <Button color="primary">Submit</Button>
                                                        </Col>
                                                    </FormGroup>
                                                </Form>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }

export default CookingInventory;