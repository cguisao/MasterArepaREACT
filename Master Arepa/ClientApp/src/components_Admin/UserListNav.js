import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function UserListNav() {
    return (
        <Nav.Link ><Link className="nav-link" to="/">Home</Link></Nav.Link>
    );
}

export default UserListNav;