import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

function LogoNav() {
    return (<React.Fragment>
        <Navbar.Brand href="/" >
                <img src="images/logo.jpg" alt="" height="95" />
        </Navbar.Brand>
        <Navbar.Brand href="/">Master Arepa</Navbar.Brand>
    </React.Fragment>);
}

export default LogoNav;