import React from 'react';
import NavMenu from "./NavMenu";
import LogoNav from "./LogoNav";

function VisitorNavbar() {

    return (<React.Fragment>
        <nav className="navbar navbar-expand-lg  fixed-top navbar-custom sticky-dark">
            <div className="container">                
                <LogoNav />

                <NavMenu />
            </div>
        </nav>
    </React.Fragment>);
}

export default VisitorNavbar;