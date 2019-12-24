import React from 'react';
import { NavDropdown } from 'react-bootstrap';

function UserListNav() {
    return (
        <React.Fragment>
            <NavDropdown title="Inventory" variant="outline-dark">
                <NavDropdown.Header >Home Inventory</NavDropdown.Header>
                <NavDropdown.Item href="/MainInventory">Home Inventory</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Header >Daily Inventory</NavDropdown.Header>
                <NavDropdown.Item href="/FoodTruckInventory">Daily Inventory</NavDropdown.Item>
                <NavDropdown.Divider />
            </NavDropdown>
        </React.Fragment>
    );
}

export default UserListNav;