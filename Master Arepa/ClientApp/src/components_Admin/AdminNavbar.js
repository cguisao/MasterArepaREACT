import React from 'react';
import NavMenu from './NavMenu';
import UserListNav from './UserListNav';
import LogoNav from './LogoNav';
import AdminListNav from "./AdminListNav";

function AdminNavbar() {
    return (<React.Fragment>
        <nav className="navbar navbar-expand-lg  fixed-top navbar-custom sticky-dark">
            <div className="container">                
                <LogoNav />

                <div className="collapse navbar-collapse">
                    <div className="navbar-nav ml-auto">
                        <ul className="navbar-nav ml-auto navbar-right" id="mySidenav">
                            <UserListNav />
                            <AdminListNav />
                        </ul>
                    </div>
                </div>
                <NavMenu />
            </div>
        </nav>
    </React.Fragment>);
}

export default AdminNavbar;