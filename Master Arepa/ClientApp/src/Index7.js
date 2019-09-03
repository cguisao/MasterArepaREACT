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

function Index7(){

  useEffect(() => {
      document.getElementById("main_navbar").classList.add("navbar-light");
    });

  return (
    <React.Fragment>

      {/* preloader */}
      <Preloader />

      {/* Navigation Menu */}
      <Navbar />

      {/* HomeSection Menu */}
      <Home7 />

      {/* AboutSection Menu */}
      <AboutSection />

      {/* TacoSection Menu */}
      <TacoSection />

      {/* MenuSection Menu */}
      <MenuSection />

      {/* ClientSection Menu */}
      <BurgerSection />

      {/* GoogleCalendar Menu */}
      < GoogleCalendar />

      {/* Wings Menu */}
      <Wings />

      {/* ContactSection Menu */}
      <ContactSection />

      {/* FooterAlt Menu */}
      <FooterAlt />

    </React.Fragment>

  );
};

export default Index7;