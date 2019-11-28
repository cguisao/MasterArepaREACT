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
import handleSubmit from "../componentsAPI/submitItem";

const IncreaseInventory = () => {

    const [setErrors, setErrorsType] = useState(false, false, false);
    const [data, setItems] = useState({});
    const [type, setTypes] = useState({});
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        async function fetchTypes(){
            const res = await fetch("api/Admin/GetInventoryType");
            res
            .json()
            .then(res => setTypes(res))
            .catch(err => setErrorsType(err));
        }
        async function fetchData() {
            const res = await fetch("api/Inventory/GetHomeInventoryItem");
            res
              .json()
              .then(res => setItems(res))
              .catch(err => setErrors(err));
          }
          fetchData();
          fetchTypes();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
        window.location.reload();
      };
    
    const handleClose = () => {
        setOpen(false);
    };

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
                                <h2 className="text-dark mb-1 font-weight-light text-uppercase">Increase Daily Inventory</h2>
                            </div>
                        </Col>
                    </div>
                        <Row>
                            <Col lg="12">
                                <div className="contact-box p-5">
                                    <Row>
                                        <Col lg="12" md="12">
                                            <Form onSubmit={handleSubmit("api/Inventory/IncreaseDailyInventory")}>
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
                                                            <Input type="number" name={item.item} id={item.id} placeholder={"Currently in stock: " + item.quantity}/>
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
                                                        <Button type="submit" variant="contained" color="primary" onClick={handleClickOpen}>Submit</Button>
                                                    </Col>
                                                </FormGroup>
                                            </Form>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <div>
                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title">
                        <DialogTitle id="responsive-dialog-title">
                        {"Awesome!!"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText />
                            <DialogContentText>
                                <p>Daily Inventory Increased</p>
                            </DialogContentText>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary" autoFocus>Close</Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                    </div>
                </section>
            </React.Fragment>
            );   
        }
      else{
        return <NotAuthenticated />;
      }
}

export default IncreaseInventory;