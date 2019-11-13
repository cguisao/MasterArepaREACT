import React, { useEffect, useState } from "react";
import { Row, Col } from 'reactstrap';
import { Container } from "react-bootstrap";
import { useAuth0 } from "../react-auth0-wrapper";
import NotAuthenticated from "../components_Admin/NotAuthenticated";
import Preloader from "../components/Preloader";

const HomeInventoryList  = () => {
    
    const [setErrors] = useState(false);
    const [data, setItems] = useState({});
  
    useEffect(() => {
        async function fetchData() {
          const res = await fetch("api/Inventory/GetHomeInventoryItem");
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
            <Container>
                <Row>
                    <Col lg="12">
                        <div className="title-heading mb-5">
                            <h2 className="text-dark mb-1 font-weight-light text-uppercase">Home Inventory Item List</h2>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12">
                        <div className="contact-box p-5">
                            <Row>
                                <Col lg="8" md="6">
                                    <table className='table table-striped' aria-labelledby="tabelLabel">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.values(data).map(item =>
                                                <tr key={item.id}>
                                                    <td>{item.item}</td>
                                                    <td>{item.quantity}</td>
                                                </tr>)}
                                        </tbody>
                                    </table>
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

export default HomeInventoryList;