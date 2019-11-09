import React, { useEffect, useState } from "react";
import { Row, Col } from 'reactstrap';
import { Container } from "react-bootstrap";
import { useAuth0 } from "../react-auth0-wrapper";
import NotAuthenticated from "../components_Admin/NotAuthenticated";
import Preloader from "../components/Preloader";

const InventoryList  = () => {
    
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
    
    if(isAuthenticated && role == "Admin"){
    return (
        <section className="section bg-about bg-light-about bg-light" id="FoodTruckInventory">
            <Container>
                <div className="row">
                    <Col lg="12">
                        <div className="title-heading mb-5">
                            <h2 className="text-dark mb-1 font-weight-light text-uppercase">Inventory Item List</h2>
                        </div>
                    </Col>
                </div>
                <Row>
                    <Col lg="12">
                        <div className="contact-box p-5">
                            <Row>
                                <Col lg="8" md="6">
                                    <table className='table table-striped' aria-labelledby="tabelLabel">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.values(data).map(item =>
                                                <tr key={item.id}>
                                                    <td>{item.item}</td>
                                                </tr>)}
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );   
    }
    else{
        return <NotAuthenticated />;
    }
}

export default InventoryList;