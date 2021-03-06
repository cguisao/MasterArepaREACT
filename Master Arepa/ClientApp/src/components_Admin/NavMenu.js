import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useAuth0 } from "../react-auth0-wrapper";

function NavMenu() {
    const { logout, user } = useAuth0();
    return (        
        <Dropdown>
            <Dropdown.Toggle variant="outline-warning"><img src={user.picture} alt="Profile" className="nav-user-profile rounded-circle" width="70" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item>{user.name}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item><Link variant="dark" to="/Profile">Profile</Link></Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default NavMenu;