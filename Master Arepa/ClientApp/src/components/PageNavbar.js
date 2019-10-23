import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollspyNav from './scrollSpy';
import { Button } from 'reactstrap';
import { useAuth0 } from "../react-auth0-wrapper";

function PageNavbar() {
    
    const { loginWithRedirect } = useAuth0();
    
    useEffect(() => {
        document.getElementById("main_navbar").classList.add("navbar-light");
    });

    return (<React.Fragment>
        <nav id="main_navbar" className="navbar navbar-expand-lg  fixed-top navbar-custom sticky sticky-dark">
            <div className="container">
                <Link className="navbar-brand logo" to="/">
                    <img src="images/logo.jpg" alt="" height="95" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="mdi mdi-menu"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ScrollspyNav scrollTargetIds={["home", "about", "menu", "location", "contact"]} activeNavClass="active" scrollDuration="1000" headerBackground="true" className="ml-auto">
                        <ul className="navbar-nav ml-auto navbar-center" id="mySidenav">
                            <li className="nav-item active"><a href="#home" className="nav-link">Home</a></li>
                            <li className="nav-item"><a href="#about" className="nav-link">About</a></li>
                            <li className="nav-item"><a href="#menu" className="nav-link">Menu</a></li>
                            <li className="nav-item"><a href="#location" className="nav-link">Location</a></li>
                            <li className="nav-item"><a href="#contact" className="nav-link">Contact us</a> </li>
                        </ul>
                    </ScrollspyNav>
                </div>

                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ml-auto">
                        <Button color="primary" outline color="secondary" type="button" size="sm" onClick={() => loginWithRedirect("/Dashboard")}>Self Service
                                </Button>
                    </div>
                </div>
            </div>
        </nav>
    </React.Fragment>);
}

export default PageNavbar;