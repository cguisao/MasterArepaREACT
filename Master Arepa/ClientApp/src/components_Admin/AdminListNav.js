import React from 'react';
import { Link } from 'react-router-dom';

function AdminListNav() {
    return (
    <React.Fragment>
        <li className="nav-item"><Link className="nav-link" to="/AddItem">Add Item</Link></li>
    </React.Fragment>);
}

export default AdminListNav;