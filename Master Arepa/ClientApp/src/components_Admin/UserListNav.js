import React from 'react';
import { NavDropdown } from 'react-bootstrap';

function UserListNav() {
    return (
        <React.Fragment>
            <NavDropdown title="Inventory" variant="outline-dark">
                <NavDropdown.Header >Cooking Inventory</NavDropdown.Header>
                <NavDropdown.Item href="/MainInventory">Home Inventory</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Header >Food Truck Inventory</NavDropdown.Header>
                <NavDropdown.Item href="/FoodTruckInventory">Daily Inventory</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Header >Tent Inventory</NavDropdown.Header>
                <NavDropdown.Item href="" >Daily Inventory</NavDropdown.Item>
            </NavDropdown>
        </React.Fragment>
    );
}

export default UserListNav;