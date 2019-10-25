import React from 'react';
import NavMenu from "./NavMenu";
import LogoNav from "./LogoNav";
import { Navbar, Container } from 'react-bootstrap';

function VisitorNavbar() {

    return (
        <section className="section bg-about bg-light-about bg-light" id="dashboard">
            <Navbar fixed="top" expand="lg" bg="dark" variant="dark" >
                <Container>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <LogoNav />
                    </Navbar.Collapse>
                    <NavMenu />
                </Container>
            </Navbar>
        </section>
    );
}

export default VisitorNavbar;