import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Label, FormGroup } from 'reactstrap';
import { Container } from "react-bootstrap";
import { useAuth0 } from "../react-auth0-wrapper";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NotAuthenticated from "../components_Admin/NotAuthenticated";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Preloader from "../components/Preloader";

const FoodTruckInventory = () => {
    
    const [setErrors, setErrorsType] = useState(false, false);
    const [data, setItems] = useState({});
    const [type, setTypes] = useState({});
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function fetchTypes(){
            const res = await fetch("api/Admin/GetInventoryType");
            res
            .json()
            .then(res => setTypes(res))
            .catch(err => setErrorsType(err));
        }
        async function fetchData() {
            const res = await fetch("api/Admin/GetInventoryItem");
            res
              .json()
              .then(res => setItems(res))
              .catch(err => setErrors(err));
          }
          fetchData();
          fetchTypes();
    }, []);
        
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
            <React.Fragment>
                <section className="section bg-about bg-light-about bg-light" id="FoodTruckInventory">
                <Container>
                    <div className="row">
                        <Col lg="12">
                            <div className="title-heading mb-5">
                                <h2 className="text-dark mb-1 font-weight-light text-uppercase">Daily Inventory</h2>
                            </div>
                        </Col>
                    </div>
                        <Row>
                            <Col lg="12">
                                <div className="contact-box p-5">
                                    <Row>
                                        <Col lg="12" md="12">
                                            <Form onSubmit={handleSubmit}>
                                            <FormGroup row>
                                                <Label for="select" sm={3}>Inventory Type</Label>
                                                <Col sm={9}>
                                                    <Input type="select" name="InventoryType" id="InventoryType">
                                                        {Object.values(type).map(typeItem => <option>{typeItem.type}</option>)}
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                                {Object.values(data).map(item =>
                                                    <FormGroup row>
                                                        <Label htmlFor={item.item} sm={3}>{item.item}</Label>
                                                        <Col sm={9}>
                                                            <Input type="text" name={item.item} id={item.id} placeholder={item.item} required/>
                                                        </Col>
                                                    </FormGroup>
                                                )}
                                                <FormGroup>
                                                    <Input type="hidden" value={user.name} name="User" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Input type="hidden" value={role} name="Role" />
                                                </FormGroup>
                                                <br />
                                                <FormGroup row>
                                                    <Col>
                                                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                                                    </Col>
                                                </FormGroup>
                                            </Form>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    {/* <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title">
                        <DialogTitle id="responsive-dialog-title">{"Missing Items?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose} color="primary">
                                Disagree
                            </Button>
                            <Button onClick={handleClose} color="primary" autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog> */}
                </section>
            </React.Fragment>
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