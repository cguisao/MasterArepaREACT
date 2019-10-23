import React from 'react';
import NavMenu from "./NavMenu";
import UserListNav from './UserListNav';

function VisitorNavbar() {

    return (<React.Fragment>
        <nav className="navbar navbar-expand-lg  fixed-top navbar-custom sticky-dark">
            <div className="container">
                
                <UserListNav />

                <NavMenu />

            </div>
        </nav>
    </React.Fragment>);
}

export default VisitorNavbar;