import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Label, Button, FormGroup } from 'reactstrap';
import { Container } from "react-bootstrap";
import { useAuth0 } from "../react-auth0-wrapper";
import NotAuthenticated from "../components_Admin/NotAuthenticated";
import Preloader from "../components/Preloader";

const FoodTruckInventory = () => {
    
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
      
      if(isAuthenticated && (role == "Admin" || role == "User")){
        return (
            <Container>
                <div className="row">
                  <Col lg="12">
                      <div className="title-heading mb-5">
                          <h2 className="text-dark mb-1 font-weight-light text-uppercase">Daily Food Truck Inventory</h2>
                      </div>
                  </Col>
              </div>
                <Row>
                    <Col lg="12">
                        <div className="contact-box p-5">
                            <Row>
                                <Col lg="12" md="12">
                                    <Form onSubmit={handleSubmit}>
                                        {Object.values(data).map(item =>
                                            <FormGroup row>
                                                <Label htmlFor={item.item} sm={3}>{item.item}</Label>
                                                <Col sm={9}>
                                                    <Input type="text" name={item.item} id={item.id} placeholder={item.item} />
                                                </Col>
                                            </FormGroup>
                                        )}
                                        <br />
                                        <FormGroup row>
                                            <Col>
                                                <Button color="primary">Submit</Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        );   
      }
      else{
        return <NotAuthenticated />;
      }
}

function handleSubmit(event) {

    event.preventDefault();
    const data = new FormData(event.target);
    console.log(event.target);
    fetch('api/Inventory/AddFoodTruckInventory', {
        method: 'POST',
        body: data
    }).then(function(response){
        return response.json();
    }).then(function(data){
        if(data.response != undefined){
            // Show that nothing went wrong
            // Show that Item is already in the database
            if(data.response == "Success"){
                alert("Food Truck Inventory Added Successfully!");
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
            alert("Error on server info: \n" + "data.response" + data.ClassName + "\n" + "data.response" + data.response);
        }
    }).catch(function(err){
        alert("Server completely down info: \n" + err);
    })
}

export default FoodTruckInventory;