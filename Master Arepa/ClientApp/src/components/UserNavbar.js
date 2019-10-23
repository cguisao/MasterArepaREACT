import React from 'react';
import NavMenu from '../components_Admin/NavMenu';
import UserListNav from '../components_Admin/UserListNav';
import LogoNav from '../components_Admin/LogoNav';

function UserNavbar() {
    return (<React.Fragment>
        <nav className="navbar navbar-expand-lg  fixed-top navbar-custom sticky-dark">
            <div className="container">                
                <LogoNav />

                <div className="collapse navbar-collapse">
                    <div className="navbar-nav ml-auto">
                        <ul className="navbar-nav ml-auto navbar-right" id="mySidenav">
                            <UserListNav />
                        </ul>
                    </div>
                </div>
                <NavMenu />
            </div>
        </nav>
    </React.Fragment>);
}

export default UserNavbar;