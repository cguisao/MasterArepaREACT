import React from 'react';
import NavMenu from "./NavMenu";
import LogoNav from "./LogoNav";
import { Navbar, Container, Nav } from 'react-bootstrap';

function VisitorNavbar() {

    return (
        <Navbar collapseOnSelect expand="lg" bg="warning" variant="light">
            <Container>
                <Navbar.Brand href="/"><LogoNav /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        <NavMenu />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default VisitorNavbar;