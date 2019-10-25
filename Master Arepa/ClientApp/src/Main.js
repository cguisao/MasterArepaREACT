import React from 'react';
import { useAuth0 } from "./react-auth0-wrapper";
import MainPage from "./components/MainPage";
import Dashboard from "./components_Admin/Dashboard";
import Preloader from './components/Preloader';
import FooterAlt from './components/FooterAlt';

function Index(){

  const { loading, isAuthenticated } = useAuth0();
  
  if (loading) {
        return (<Preloader />
      );
  }

  return ( 
    <React.Fragment>
      {!isAuthenticated && ( <MainPage /> )}
      {isAuthenticated && ( <Dashboard />)}
    </React.Fragment>
  );
};

export default Index;