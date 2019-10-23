import React from 'react';
import { useAuth0 } from "../react-auth0-wrapper";
import NotAuthenticated from './NotAuthenticated';
import Preloader from '../components/Preloader';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import VisitorDashboard from './VisitorDashboard';

function Dashboard(){

    const { loading, isAuthenticated, user } = useAuth0();

    if (loading) {
        return <Preloader />;
    }

    // Not Authorized if not logged in
    if(!isAuthenticated){
        return <NotAuthenticated />;
    }

    var role = user[Object.keys(user)[0]];

    // Admin Dashboard
    if (isAuthenticated && role == "Admin") {
        return <AdminDashboard />;
    }

    // User Dashboard 
    else if (isAuthenticated && role == "User") {
        return <UserDashboard />;
    }

    // Visitor Dashboard
    else{
        return <VisitorDashboard />;
    }
}

export default Dashboard;