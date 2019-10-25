import React from "react";
import { Row, Col, Form, Input, Label, Button } from 'reactstrap';
import { useAuth0 } from "../react-auth0-wrapper";
import NotAuthenticated from "../components_Admin/NotAuthenticated";
import Preloader from "../components/Preloader";
import { Container } from "react-bootstrap";

function handleSubmit(event) {

    event.preventDefault();
    const data = new FormData(event.target);

    fetch('api/Admin/AddItem', {
        method: 'POST',
        body: data
    }).then(function(response){
        return response.json();
    }).then(function(data){
        if(data.response != undefined){
            // Show that nothing went wrong
            // Show that Item is already in the database
            if(data.response == "Success"){
                alert("Item added successfully!");
                window.location.reload();
            }
            // Show that the Item has successfully been added then reload the page
            else if(data.response == "Error")
            {
                alert(data.error);
            }
        }
        else{
            // Show that there is an error on the server
            console.log("Error on server info: \n" + "data.response" + data.ClassName + "\n" + "data.response" + data.response);
        }
    }).catch(function(err){
        console.log("Server completely down info: \n" + err);
    })

}

function AdminInventory(){
    return (
        <Container>
            <div className="row">
              <Col lg="12">
                  <div className="title-heading mb-5">
                      <h2 className="text-dark mb-1 font-weight-light text-uppercase">Add Inventory Item</h2>
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
        </Container>
    );
}

function AddItem(){
    
    const { loading, isAuthenticated, user } = useAuth0();

    if (loading) {
        return <Preloader />;
    }

    var role = user[Object.keys(user)[0]];

    if(isAuthenticated && role == "Admin"){
        return <AdminInventory />;
    }
    else{
        return <NotAuthenticated />;
    }
    
}

export default AddItem;