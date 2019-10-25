import React from 'react';
import NavMenu from '../components_Admin/NavMenu';
import UserListNav from '../components_Admin/UserListNav';
import LogoNav from '../components_Admin/LogoNav';
import { Nav, Navbar, Container } from 'react-bootstrap';

function UserNavbar() {
    return (
        <section className="section bg-about bg-light-about bg-light" id="dashboard">
            <Navbar fixed="top" expand="lg" bg="dark" variant="dark" >
                <Container>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <LogoNav />
                    <Nav>
                        <UserListNav />
                    </Nav>
                </Navbar.Collapse>
                <NavMenu />
                </Container>
            </Navbar>
        </section>
    );
}

export default UserNavbar;