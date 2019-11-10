import React from 'react';
import UserListNav from './UserListNav';
import AdminListNav from "./AdminListNav";
import { Nav, Navbar, Container } from 'react-bootstrap';
import NavMenu from './NavMenu';
import LogoNav from './LogoNav';


function AdminNavbar() {

    return (
        <Navbar collapseOnSelect expand="lg" bg="warning" variant="light">
            <Container>
                <Navbar.Brand href="/"><LogoNav /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <UserListNav />
                        <AdminListNav />
                    </Nav>
                    <Nav>
                        <NavMenu />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminNavbar;