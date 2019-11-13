import React from "react";
import { Row, Col, Form, Input, Label, Button } from 'reactstrap';
import { useAuth0 } from "../react-auth0-wrapper";
import NotAuthenticated from "../components_Admin/NotAuthenticated";
import Preloader from "../components/Preloader";
import { Container } from "react-bootstrap";
import AddItem from '../ComponentsInventory/AddItem';
import InventoryList from "../ComponentsInventory/InventoryList";



function AdminInventory(){
    
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
                            <Col><AddItem /></Col>
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

export default AdminInventory;