import React from 'react';
import Iframe from 'react-iframe'
import { Row, Col } from 'reactstrap';
class GoogleCalendar extends React.Component {
    render() {
        return (
            <section className="section bg-light" id="location">
                    <div className="container">
                        <div className="row">
                            <Col lg="12">
                                <div className="title-heading mb-5">
                                    <h3 className="text-dark mb-1 font-weight-light text-uppercase">Find us at..</h3>
                                </div>
                            </Col>
                        </div>
                        <Row>
                            <Iframe url="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23F6BF26&amp;ctz=America%2FNew_York&amp;src=Y2d1aXNhb0BtYXN0ZXJhcmVwYS5jb20&amp;color=%23F09300&amp;showTitle=0&amp;showNav=1&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;title=Master%20Arepa%20Website&amp;showDate=1" style="border-width:0"
                                frameBorder = {5}
                                width="100%"
                                height="500"
                                frameBorder="0"
                                display="initial"
                                position="relative"/>
                        </Row>
                    </div>
                </section>)}}

export default GoogleCalendar;
