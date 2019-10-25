import React from 'react';
import UserListNav from './UserListNav';
import AdminListNav from "./AdminListNav";
import { Nav, Navbar, Container } from 'react-bootstrap';
import NavMenu from './NavMenu';
import LogoNav from './LogoNav';

function AdminNavbar() {
    return (
        <section className="section bg-about bg-light-about bg-light" id="dashboard">
            <Navbar fixed="top" expand="lg" bg="dark" variant="dark" >
                <Container>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <LogoNav />
                    <Nav>
                        <UserListNav />
                        <AdminListNav />
                    </Nav>
                </Navbar.Collapse>
                <NavMenu />
                </Container>
            </Navbar>
        </section>
    );
}

export default AdminNavbar;