import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useAuth0 } from "../react-auth0-wrapper";

function UserNavbar() {
    const { logout, user } = useAuth0();
    return (<React.Fragment>
        <nav className="navbar navbar-expand-lg  fixed-top navbar-custom sticky-dark">
            <div className="container">
                <Link className="navbar-brand logo" to="/">
                    <img src="images/logo.jpg" alt="" height="95" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="mdi mdi-menu"></i>
                </button>

                <div className="collapse navbar-collapse">
                    <div className="navbar-nav ml-auto">
                        <ul className="navbar-nav ml-auto navbar-center" id="mySidenav">

                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ml-auto">
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-dark"><img src={user.picture} alt="Profile" className="nav-user-profile rounded-circle" width="50" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>{user.name}</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item><Link to="/Profile">Profile</Link></Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
    </React.Fragment>);
}

export default UserNavbar;