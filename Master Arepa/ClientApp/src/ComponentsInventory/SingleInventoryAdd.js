import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Label, FormGroup, Button } from 'reactstrap';
import Preloader from "../components/Preloader";
import NotAuthenticated from "../components_Admin/NotAuthenticated";
import { useAuth0 } from "../react-auth0-wrapper";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";
import { Container } from "reactstrap";

function SingleInventoryAdd(){
    const useStyles = makeStyles(theme => ({
        root: {
          display: "flex",
          alignItems: "center"
        },
        wrapper: {
          margin: theme.spacing(1),
          position: "relative"
        },
        buttonSuccess: {
          backgroundColor: green[500],
          "&:hover": {
            backgroundColor: green[700]
          }
        },
        fabProgress: {
          color: green[500],
          position: "absolute",
          top: -6,
          left: -6,
          zIndex: 1
        },
        buttonProgress: {
          color: green[500],
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: -12,
          marginLeft: -12
        }
      }));

    const classes = useStyles();
    const [setErrors, setErrorsType, setErrorsOtherType] = useState(false);
    const [data, setItems] = useState({});
    const [type, setTypes] = useState({}); 
    const [success, setSuccess] = React.useState(false);
    const [buttonLoading, setLoading] = React.useState(false);
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success
      });

    useEffect(() => {
      async function fetchTypes(){
        const res = await fetch('api/Admin/GetInventoryItem');
            res
            .json()
            .then(res => setTypes(res))
            .catch(err => setErrorsType(err));
          }
          fetchTypes();
    }, []);
    
    const handleSubmit = url => {
      return event => {
          console.log(url);
          setLoading(true);
          event.preventDefault();
          const data = new FormData(event.target);
          fetch(url, {
              method: 'POST',
              body: data
          }).then(function (response) {
              return response.json();
          }).then(function (data) {
              if (data.response != undefined) {
                  // Show that nothing went wrong
                  // Show that Item is already in the database
                  if (data.response == "Success") {
                      console.log("Item added successfully!");
                      if (!data.popup)
                          window.location.reload(false);

                  }
                  // Show that the Item has successfully been added then reload the page
                  else if (data.response == "Error") {
                      alert(data.error);
                  }
              }
              else {
                  // Show that there is an error on the server
                  console.log("Error on server info: \n" + "data.response" + data.ClassName + "\n" + "data.response" + data.response);
              }
          }).catch(function (err) {
              console.log("Server completely down info: \n" + err);
          });
        };
      }

    const { loading, isAuthenticated, user } = useAuth0();

    if (loading) {
      return <Preloader />;
    }
    
    if(!isAuthenticated){
      return <NotAuthenticated />;
    }

    var role = user[Object.keys(user)[0]];

    if (loading) {
      return <Preloader />;
    }
    
    if(!isAuthenticated){
      return <NotAuthenticated />;
    }
    if(isAuthenticated && (role == "Admin" || role == "User")){
      return (
        <React.Fragment>
          <section className="section bg-about bg-light-about bg-light" id="IncreaseDailyInventory">
            <Container>
            < div className="row">
                <Col lg="12">
                    <div className="title-heading mb-5">
                        <h2 className="text-dark mb-1 font-weight-light text-uppercase">Single Home Inventory</h2>
                    </div>
                </Col>
              </div>
              <Row>
                <Col lg="12">
                <div className="contact-box p-5">
                  <Row>
                    <Col lg="12" md="12">
                      <Form onSubmit={handleSubmit('api/Inventory/HomeInventory')}>
                        <Col sm="12">
                        <div className="title-heading mb-5">
                          <h5 className="text-dark mb-1 font-weight-light text-uppercase">Inventory Item</h5>
                        </div>
                        </Col>
                        <FormGroup row>
                          <Col sm={6}>
                            <Input type="select" name="SingleInventory" id="SingleInventory">
                                {Object.values(type).map(typeItem => <option>{typeItem.item}</option>)}
                            </Input>
                            </Col>
                            <Col sm={6}>
                              <Input type="number" id="SingleValue" name="SingleValue" sm={4} required></Input>
                            </Col>
                          </FormGroup>
                          <FormGroup>
                              <Input type="hidden" value={user.name} name="User" />
                          </FormGroup>
                          <FormGroup>
                              <Input type="hidden" value={role} name="Role" />
                          </FormGroup>
                          <br />
                          <FormGroup>
                            <Col sm="12">
                              <Button type="submit" color="primary">Submit</Button>
                            </Col>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </React.Fragment>
      )
    }
};

export default SingleInventoryAdd;