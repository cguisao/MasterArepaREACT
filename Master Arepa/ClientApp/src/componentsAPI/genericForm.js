// The reason for this generic form is to write the code once and be able to maintain all inventory forms with 
// the same functionality. 

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
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";

function GenericForm ({fetchTypesApi, fetchDataApi, title, SubmitApi}){

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
    const [otherType, SetOtherType] = useState({});
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [success, setSuccess] = React.useState(false);
    const [buttonLoading, setLoading] = React.useState(false);
    
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success
      });
    
    const handleButtonClick = () => {
        if (!loading) {
          setSuccess(false);
          setLoading(true);
        }
    };

    useEffect(() => {
        async function fetchTypes(){
            const res = await fetch(fetchTypesApi);
            res
            .json()
            .then(res => setTypes(res))
            .catch(err => setErrorsType(err));
        }
        async function fetchData() {
            const res = await fetch(fetchDataApi);
            res
              .json()
              .then(res => setItems(res))
              .catch(err => setErrors(err));
          }
          async function fetchOtherTypes() {
            const res = await fetch(fetchDataApi);
            res
              .json()
              .then(res => SetOtherType(res))
              .catch(err => setErrorsOtherType(err));
          }
          fetchData();
          fetchTypes();
          fetchOtherTypes();
    }, []);
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = url => event => {
        console.log(url);
        event.preventDefault();
        const data = new FormData(event.target);
    
        fetch(url, {
            method: 'POST',
            body: data
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(data.response != undefined){
                // Show that nothing went wrong
                // Show that Item is already in the database
                if(data.response == "Success"){
                    console.log("Item added successfully!");
                    setSuccess(true);
                    setLoading(false);
                    console.log('data.popup' + data.popup);
                    setOpen(data.popup)
                    if(!data.popup) alert("Item added successfully!");
                }
                else if(data.response == "Success"){
                    alert("Item added successfully!");
                }
                // Show that the Item has successfully been added then reload the page
                else if(data.response == "Error"){
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
                <section className="section bg-about bg-light-about bg-light" id="IncreaseDailyInventory">
                <Container>
                    <div className="row">
                        <Col lg="12">
                            <div className="title-heading mb-5">
                                <h2 className="text-dark mb-1 font-weight-light text-uppercase">{title}</h2>
                            </div>
                        </Col>
                    </div>
                        <Row>
                            <Col lg="12">
                                <div className="contact-box p-5">
                                    <Row>
                                        <Col lg="12" md="12">
                                            <Form onSubmit={handleSubmit(SubmitApi)}>
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
                                                            <Input type="number" name={item.item} id={item.id} placeholder={"Currently in stock: " + item.quantity} required/>
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
                                                        <div className={classes.root}>
                                                            <div className={classes.wrapper}>
                                                                <Button
                                                                type="submit"
                                                                variant="contained"
                                                                color="primary"
                                                                className={buttonClassname}
                                                                disabled={buttonLoading}
                                                                onClick={handleButtonClick}
                                                                >
                                                                Submit
                                                                </Button>
                                                                {buttonLoading && (
                                                                <CircularProgress size={24} className={classes.buttonProgress} />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </FormGroup>
                                            </Form>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">
                        {"Missing Items?"}
                        </DialogTitle>
                        <Form onSubmit={handleSubmit("api/Inventory/AddOtherInventory")}>
                            <DialogContent>
                                <DialogContentText />
                                <DialogContentText>
                                    <FormGroup row>
                                        <Label for="select" sm={3}>Inventory Type</Label>
                                        <Col sm={9}>
                                            <Input type="select" name="InventoryType" id="InventoryType">
                                                {Object.values(type).map(typeItem => <option>{typeItem.type}</option>)}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    {Object.values(otherType).map(item =>
                                        <FormGroup check>
                                            <Input type="checkbox" name={item.item} />{' '}  {item.item}
                                        </FormGroup>
                                    )}
                                    <FormGroup>
                                        <Input type="hidden" value={user.name} name="User" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="hidden" value={role} name="Role" />
                                    </FormGroup>
                                </DialogContentText>
                                <DialogActions>
                                    <Button type="submit" onClick={handleClose} color="primary" autoFocus>Submit</Button>
                                </DialogActions>
                            </DialogContent>
                        </Form>
                    </Dialog>
                </section>
            </React.Fragment>
            );   
        }
      else{
        return <NotAuthenticated />;
      }
}

export default GenericForm;