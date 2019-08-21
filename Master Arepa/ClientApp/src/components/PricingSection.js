import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';


class PricingSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            PlaneList: [{
                "name": "Basic",
                "price": "19.00",
                "bandwidth": "1GB",
                "space": "100MB",
                "support": "No",
                "domain": "05",
                "fees": "No",
                "is_active" : false
            },{
                "name": "Popular",
                "price": "39.00",
                "bandwidth": "1.5GB",
                "space": "500MB",
                "support": "Yes",
                "domain": "10",
                "fees": "No",
                "is_active" : true
            },{
                "name": "Advance",
                "price": "80.00",
                "bandwidth": "2GB",
                "space": "1GB",
                "support": "Yes",
                "domain": "15",
                "fees": "No",
                "is_active" : false
            },{
                "name": "Premium",
                "price": "19.00",
                "bandwidth": "2.5GB",
                "space": "1.5GB",
                "support": "No",
                "domain": "20",
                "fees": "Yes",
                "is_active" : false
            },
            ]
        };
    }
    render() {
        return (
            <React.Fragment>
                <section className="section" id="pricing">
                    <div className="container">
                        <Row>
                            <Col lg="12">
                                <div className="title-heading mb-5">
                                    <h3 className="text-dark mb-1 font-weight-light text-uppercase">Our Pricing</h3>
                                    <div className="title-border-simple position-relative"></div>
                                </div>
                            </Col>
                        </Row>
                        <div className="row">

                        {this.state.PlaneList.map((plan, index) => {
                                return  <Col lg="3" md="6" key={index}>
                                            <div className={plan.is_active ? "pricing-box active mt-4" : "pricing-box mt-4"}>
                                                <div className="price bg-light position-relative p-4">
                                                    <div className="float-left">
                                                        <h5 className="text-dark title mt-2 font-weight-normal f-18 mb-0">{plan.name}</h5>
                                                    </div>
                                                    <div className="">
                                                        <h2 className="text-dark font-weight-normal text-right mb-0"><sup>$</sup>{plan.price}</h2>
                                                    </div>
                                                </div>
                                                <div className="p-4 pricing-list">
                                                    <ul className="list-unstyled mb-0">
                                                        <li className="text-muted f-14">Bandwidth:{plan.bandwidth} </li>
                                                        <li className="text-muted f-14">Onlinespace: {plan.space}</li>
                                                        <li className="text-muted f-14">Support: {plan.support}</li>
                                                        <li className="text-muted f-14">Domain: {plan.domain}</li>
                                                        <li className="text-muted mb-0 f-14">Hidden Fees: {plan.fees}</li>
                                                    </ul>
                                                </div>
                                                <div className="pl-4 mb-4 mt-2">
                                                    <Link to="#" className={plan.is_active ? "btn btn-outline btn-sm active" : "btn btn-outline btn-sm"} >Buy Now</Link>
                                                </div>
                                            </div>
                                        </Col>
                            })}
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default PricingSection;