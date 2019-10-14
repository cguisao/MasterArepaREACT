import React, { useEffect } from 'react';
import { useAuth0 } from "./react-auth0-wrapper";
import MainPage from "./components/MainPage";
import Dashboard from "./components_Admin/Dashboard";
import Preloader from './components/Preloader';

function Index(){

  const { loading, isAuthenticated } = useAuth0();
  
  useEffect(() => {
    if(!loading && !isAuthenticated){
      document.getElementById("main_navbar").classList.add("navbar-light");
    }
  })
  
  if (loading) {
    return (<Preloader />
      );
  }

  return ( 
    <React.Fragment>
      {!isAuthenticated && ( <MainPage /> )}
      {isAuthenticated && ( <Dashboard /> )}
    </React.Fragment>
  );
};

export default Index;