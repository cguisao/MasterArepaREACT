import React from 'react';
import NavMenu from '../components_Admin/NavMenu';
import UserListNav from '../components_Admin/UserListNav';
import LogoNav from '../components_Admin/LogoNav';
import { Nav, Navbar, Container } from 'react-bootstrap';

function UserNavbar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="warning" variant="light">
            <Container>
                <Navbar.Brand href="/"><LogoNav /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <UserListNav />
                    </Nav>
                    <Nav>
                        <NavMenu />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default UserNavbar;