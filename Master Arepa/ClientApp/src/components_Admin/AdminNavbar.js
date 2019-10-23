import React from 'react';
import NavMenu from './NavMenu';

function AdminNavbar() {
    return (<React.Fragment>
        <nav className="navbar navbar-expand-lg  fixed-top navbar-custom sticky-dark">
            <div className="container">
                
                <UserListNav />

                <NavMenu />
            </div>
        </nav>
    </React.Fragment>);
}

export default AdminNavbar;