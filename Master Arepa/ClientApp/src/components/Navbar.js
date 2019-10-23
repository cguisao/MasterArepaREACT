import React  from 'react';
import { useAuth0 } from "../react-auth0-wrapper";
import Preloader from './Preloader';
import PageNavbar from './PageNavbar';
import VisitorNavbar from '../components_Admin/VisitorNavbar';
import AdminNavbar from '../components_Admin/AdminNavbar';
import UserNavbar from './UserNavbar';

function Navbar() {

    const { loading, isAuthenticated, user } = useAuth0();

    if (loading) {
        return <Preloader />;
    }

    // Load navar whenever not authenticated
    if (!isAuthenticated) {
        return <PageNavbar />;
    }
    
    var role = user[Object.keys(user)[0]];

    // Load navbar whenever in Admin mode
    if (isAuthenticated && role == "Admin") {
        return <AdminNavbar />;
    }

    // Load navbar whenever in user mode
    else if (isAuthenticated && role == "User") {
        return <UserNavbar />;
    }

    // Load navbar whenever user has no role
    else{
        return <VisitorNavbar />;
    }
};

export default Navbar;