import React from 'react';
import {Row, Col } from 'reactstrap';

class MenuSection extends React.Component{
    render(){
        return(
            <React.Fragment>
                <section className="section bg-about bg-light-about bg-light" id="menu">
                    <div className="custom_width container">
                        <Row>
                            <Col lg="4">
                                <div className="title-heading mb-5">
                                    <h3 className="text-dark mb-1 font-weight-light text-uppercase">Our Menu</h3>
                                    <div className="title-border-simple position-relative"></div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-md-4 col-sm-4">
                                <div className="col-wrapper">
                                    <div className="title-block txt-center">
                                        <h3 className="title-block__subtitle--menu">
                                            Arepas
                                        </h3>
                                    </div>
                                    <ul className="price-list">
                                        <li className="price-list__item">
                                            <div className="price-item">
                                                <h4 className="price-item__heading">Master Arepa</h4>
                                                <div className="price-item__separator"></div>
                                                <div className="price-item__price">$9.99</div>
                                            </div>
                                        </li>
                                        <li className="price-list__item">
                                            <div className="price-item">
                                                <h4 className="price-item__heading">Arepa Mix</h4>
                                                <div className="price-item__separator"></div>
                                                <div className="price-item__price">$8.49</div>
                                            </div>
                                        </li>
                                        <li className="price-list__item">
                                            <div className="price-item">
                                                <h4 className="price-item__heading">Steak Arepa</h4>
                                                <div className="price-item__separator"></div>
                                                <div className="price-item__price">$8.99</div>
                                            </div>
                                        </li>
                                        <li className="price-list__item">
                                            <div className="price-item">
                                                <h4 className="price-item__heading">Chicken Arepa</h4>
                                                <div className="price-item__separator"></div>
                                                <div className="price-item__price">$8.99</div>
                                            </div>
                                        </li>
                                        <li className="price-list__item">
                                            <div className="price-item">
                                                <h4 className="price-item__heading">Hawaiian Arepa</h4>
                                                <div className="price-item__separator"></div>
                                                <div className="price-item__price">$8.99</div>
                                            </div>
                                        </li>
                                        <li className="price-list__item">
                                            <div className="price-item">
                                                <h4 className="price-item__heading">Arepa Burger</h4>
                                                <div className="price-item__separator"></div>
                                                <div className="price-item__price">$9.99</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Col>

                            <Col className="col-md-4 col-sm-4">
                                <div className="col-wrapper">
                                    <div className="title-block txt-center">
                                        <h3 className="title-block__subtitle--menu">
                                            Grilled Tacos
                                        </h3>
                                    </div>
                                    <ul className="price-list">
                                        <li className="price-list__item">
                                            <div className="price-item">
                                                <h4 className="price-item__heading">3 Grilled Tacos for</h4>
                                                <div className="price-item__separator"></div>
                                                <div className="price-item__price">$8.99</div>
                                            </div>
                                        </li>
                                        <li className="price-list__item">
                                            <div className="price-item">
                                                <h4 className="price-item__heading">Steak</h4>
                                            </div>
                                        </li>
                                        <li className="price-list__item">
                                            <div className="price-item">
                                                <h4 className="price-item__heading">Chicken</h4>
                                            </div>
                                        </li>
                                        <li className="price-list__item">
                                            <div className="price-item">
                                                <h4 className="price-item__heading">Chorizo</h4>
                                            </div>
                                        </li>
                                        <li className="price-list__item">
                                            <div className="price-item">
                                                <h4 className="price-item__heading">Shrimp</h4>
                                                <div className="price-item__separator"></div>
                                                <div className="price-item__price">+ $0.99</div>
                                            </div>
                                        </li>
                                        <li className="price-list__item">
                                            <div className="price-item">
                                                <h4 className="price-item__heading">Al Pastor</h4>
                                                <div className="price-item__separator"></div>
                                                <div className="price-item__price">+ $0.99</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col className="col-md-4 col-sm-4">
                                <div className="col-wrapper">
                                    <div className="title-block txt-center">
                                        <h3 className="title-block__subtitle--menu">
                                            Sides
                                        </h3>
                                    </div>
                                    <ul className="price-list">
                                        <li className="price-list__item">
                                            <div className="price-item">
                                                <h4 className="price-item__heading">2 Tequeños</h4>
                                                <div className="price-item__separator"></div>
                                                <div className="price-item__price">$3.99</div>
                                            </div>
                                        </li>
                                        <li className="price-list__item">
                                            <div className="price-item">
                                                <h4 className="price-item__heading">2 Empanadas (Steak - Chicken - Cheese)</h4>
                                                <div className="price-item__separator"></div>
                                                <div className="price-item__price">$3.99</div>
                                            </div>
                                        </li>
                                        <li className="price-list__item">
                                            <div className="price-item">
                                                <h4 className="price-item__heading">Salchipapas</h4>
                                                <div className="price-item__separator"></div>
                                                <div className="price-item__price">$5.99</div>
                                            </div>
                                        </li>
                                        <li className="price-list__item">
                                            <div className="price-item">
                                                <h4 className="price-item__heading">Chicken Wings</h4>
                                                <div className="price-item__separator"></div>
                                                <div className="price-item__price">$7.99</div>
                                            </div>
                                        </li>
                                        <li className="price-list__item">
                                            <div className="price-item">
                                                <h4 className="price-item__heading">Burger</h4>
                                                <div className="price-item__separator"></div>
                                                <div className="price-item__price">$9.99</div>
                                            </div>
                                        </li>
                                        <li className="price-list__item">
                                            <div className="price-item">
                                                <h4 className="price-item__heading">Quesadillas (Steak - Chicken - Both)</h4>
                                                <div className="price-item__separator"></div>
                                                <div className="price-item__price">$9.99</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default MenuSection;