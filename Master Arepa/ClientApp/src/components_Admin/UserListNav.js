import React from 'react';
import { Link } from 'react-router-dom';

function UserListNav() {
    return (
    <React.Fragment>
        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
    </React.Fragment>);
}

export default UserListNav;