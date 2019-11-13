import React from 'react';
import { NavDropdown } from 'react-bootstrap';

function AdminListNav() {
    return (
        <React.Fragment>
            <NavDropdown title="Inventory Control" variant="outline-dark">
                 <NavDropdown.Item href="/AddInventoryItem" >Add Inventory Item</NavDropdown.Item>
                 <NavDropdown.Item href="/AddInventoryType" >Add Inventory Type</NavDropdown.Item>
                 <NavDropdown.Divider />
                 <NavDropdown.Item href="/HomeInventoryList" >Home Inventory List</NavDropdown.Item>
             </NavDropdown>
                 <NavDropdown title="Clover" variant="outline-dark">
                 <NavDropdown.Divider />
             </NavDropdown>
        </React.Fragment>
    );
}

export default AdminListNav;