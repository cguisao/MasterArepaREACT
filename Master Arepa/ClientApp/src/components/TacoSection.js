import React from 'react';
import { Row } from 'reactstrap';

class TacoSection extends React.Component {

    render() {
        return (
            <React.Fragment>

                <section className="home-7-bg bg-taco">
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
export default TacoSection;