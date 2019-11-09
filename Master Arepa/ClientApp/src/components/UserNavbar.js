import React from 'react';
import NavMenu from '../components_Admin/NavMenu';
import UserListNav from '../components_Admin/UserListNav';
import LogoNav from '../components_Admin/LogoNav';
import { Nav, Navbar, Container } from 'react-bootstrap';

function UserNavbar() {
    return (
        <section className="section bg-about bg-light-about bg-light" id="dashboard">
            <Navbar collapseOnSelect expand="lg" bg="warning" variant="light">
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
            </Navbar>
        </section>
    );
}

export default UserNavbar;