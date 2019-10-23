import React from 'react';
import { Link } from 'react-router-dom';

function UserListNav() {
    return (<React.Fragment>
        <Link className="navbar-brand logo" to="/">
            <img src="images/logo.jpg" alt="" height="95" />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <i className="mdi mdi-menu"></i>
        </button>

        <div className="collapse navbar-collapse">
            <div className="navbar-nav ml-auto">
                <ul className="navbar-nav ml-auto navbar-right" id="mySidenav">

                    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                </ul>
            </div>
        </div>
    </React.Fragment>);
}

export default UserListNav;