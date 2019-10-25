import React from 'react';
import { NavDropdown } from 'react-bootstrap';

function AdminListNav() {
    return (
        <NavDropdown title="Inventory" variant="outline-dark">
            <NavDropdown.Item href="/AddInventoryItem" >Add Inventory Item</NavDropdown.Item>
            <NavDropdown.Item href="/InventoryList" >Inventory List</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item >Separated link</NavDropdown.Item>
        </NavDropdown>
    );
}

export default AdminListNav;