import React from 'react';
import { Link } from 'react-router-dom';

function LogoNav() {
    return (<React.Fragment>
        <div>
            <Link className="navbar-brand logo" to="/">
                <img src="images/logo.jpg" alt="" height="95" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <i className="mdi mdi-menu"></i>
            </button>
        </div>
    </React.Fragment>);
}

export default LogoNav;