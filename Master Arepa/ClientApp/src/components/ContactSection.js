import React from 'react';
import { Row, Col, Form, Input, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';


class ContactSection extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        fetch('api/Form/PageForm', {
            method: 'POST', 
            body: data,
        }).then((result) => {
            console.log(result.text);
            alert("The message has been sent!");
            window.location.reload();
        }).catch(err => console.error(err))
    }
    render() {

        return (
            <React.Fragment>
                <section className="section bg-light" id="contact">
                    <div className="container">
                        <div className="row">
                            <Col lg="12">
                                <div className="title-heading mb-5">
                                    <h2 className="text-dark mb-1 font-weight-light text-uppercase">Get in touch</h2>
                                </div>
                            </Col>
                        </div>
                        <Row>
                            <Col lg="12">
                                <div className="contact-box p-5">
                                    <Row>
                                        <Col lg="8" md="6">
                                            <div className="custom-form p-3">
                                                <div id="message"></div>
                                                <Form onSubmit={this.handleSubmit}>
                                                    <Col sx="3">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input type="email" name="email" id="email" placeholder="Your email" />
                                                    </Col>
                                                    <Col sx="3">
                                                        <Label htmlFor="subject">Subject</Label>
                                                        <Input type="text" name="subject" id="subject" placeholder="Your Subject" />
                                                    </Col>
                                                    <Col>
                                                        <Label htmlFor="message">Message</Label>
                                                        <Input type="textarea" name="message" id="message" style={{height: 200}} placeholder="Start Typing" />
                                                    </Col>
                                                    <Col>
                                                        <Button color="primary">Submit</Button>
                                                    </Col>
                                                </Form>
                                            </div>
                                        </Col>

                                        <div className="col-lg-4 col-md-6">
                                            <div className="contact-cantent p-3">
                                                <div className="contact-details">
                                                    <div className="float-left contact-icon mr-3 mt-2">
                                                        <i className="mdi mdi-headphones text-muted h5"></i>
                                                    </div>
                                                    <div className="app-contact-desc text-muted pt-1">
                                                        <p className="mb-0 info-title f-13">Call :</p>
                                                        <p className="mb-0 f-13">1 (754) 232-7860</p>
                                                    </div>
                                                </div>

                                                <div className="contact-details mt-2">
                                                    <div className="float-left contact-icon mr-3 mt-2">
                                                        <i className="mdi mdi-email-outline text-muted h5"></i>
                                                    </div>
                                                    <div className="app-contact-desc text-muted pt-1">
                                                        <p className="mb-0 info-title f-13">Email :</p>
                                                        <p className="mb-0 f-13"><Link to="" className="text-muted">info@masterarepa.com</Link></p>
                                                    </div>
                                                </div>

                                                <div className="follow mt-4">
                                                    <h4 className="text-dark mb-3">Follow</h4>
                                                    <ul className="follow-icon list-inline mt-32 mb-0">
                                                        <li className="list-inline-item f-15"><Link to="#" className="social-icon text-muted"><i className="mdi mdi-facebook"></i></Link></li>&nbsp;
                                                        <li className="list-inline-item f-15"><Link to="#" className="social-icon text-muted"><i className="mdi mdi-instagram"></i></Link></li>&nbsp;
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default ContactSection;