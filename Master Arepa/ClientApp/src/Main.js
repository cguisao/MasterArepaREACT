import React, { useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Home7 from './components/Home7';
import AboutSection from './components/AboutSection';
import MenuSection from './components/MenuSection';
import BurgerSection from './components/BurgerSection';
import ContactSection from './components/ContactSection';
import FooterAlt from './components/FooterAlt';
import TacoSection from './components/TacoSection';
import GoogleCalendar from './components/GoogleCalendar';
import Wings from './components/wings';
import { useAuth0 } from "./react-auth0-wrapper";
import AdminNavbar from "./components_Admin/AdminNavbar"

function Index7(){

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  
  useEffect(() => {
    if(!isAuthenticated)
    {
      document.getElementById("main_navbar").classList.add("navbar-light");
    }
  });

  return (
    <React.Fragment>

      {/* preloader */}
      {!isAuthenticated && (<Preloader />)}

      {/* Navigation Menu */}
      {!isAuthenticated && <Navbar /> }

      {/* HomeSection Menu */}
      {!isAuthenticated &&  <Home7 />}

      {/* AboutSection Menu */}
      {!isAuthenticated && <AboutSection /> }

      {/* TacoSection Menu */}
      {!isAuthenticated &&<TacoSection /> }

      {/* MenuSection Menu */}
      {!isAuthenticated &&<MenuSection /> }

      {/* ClientSection Menu */}
      {!isAuthenticated &&<BurgerSection /> }

      {/* GoogleCalendar Menu */}
      {!isAuthenticated &&< GoogleCalendar /> }

      {/* Wings Menu */}
      {!isAuthenticated && <Wings /> }

      {/* ContactSection Menu */}
      {!isAuthenticated && <ContactSection /> }

      {/* FooterAlt Menu */}
      {!isAuthenticated && <FooterAlt /> }

      {/* AdminNavbar Menu */}
      {isAuthenticated && <AdminNavbar /> } 

    </React.Fragment>

  );
};

export default Index7;