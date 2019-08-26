import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

const styles = { height: 400, width: "50%" };

class FoodTruckSection extends React.Component {

    render() {
        return (
            <React.Fragment>

                <section className="home-7-bg bg-foodTruck" id="truck">
                    <div className="home-center">
                        <div className="home-desc-center">                                    
                            <div className="container">
                            <Row className="justify-content-center">
                                <h1  className="text-white home-7-title mb-0"> 
                                    <span className="element">Amazing Food Trailer</span>
                                </h1>
                            </Row>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default FoodTruckSection;