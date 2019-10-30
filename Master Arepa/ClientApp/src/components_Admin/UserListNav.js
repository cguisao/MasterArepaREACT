import React from 'react';
import { NavDropdown } from 'react-bootstrap';

function UserListNav() {
    return (
        <NavDropdown title="Food Truck Inventory" variant="outline-dark">
            <NavDropdown.Item href="/MainInventory" >Home Inventory</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/FoodTruckInventory" >Daily Inventory</NavDropdown.Item>
        </NavDropdown>
    );
}

export default UserListNav;