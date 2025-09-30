import './Navbar.css';
import { useEffect } from 'react';
import { useNavbar } from '../../../hooks/useNavbar'
import { useModal } from '../../../context/ModalContext';

import LogoButton from '../../ui/Button/LogoButton'
import NavbarMenu from './NavbarMenu';
import NavbarToggleButtons from './NavbarToggleButtons';

function Navbar() {
  const {
    menuOpen,
    isAuthenticated,
    toggleMenu,
    closeMenu,
    handleLogout,
    scrollToHero,
    getLinkClass
  } = useNavbar();
  const { openModal } = useModal();
  
  // bloquea el scroll del body
  useEffect(() => {
  function handleResize() {
    // Si el menú está abierto y la pantalla es pequeña, bloquea scroll
    if (menuOpen && window.innerWidth < 1024) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      // Si no, libera scroll
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }

  // Ejecuta al montar y cuando menuOpen cambie
  handleResize();

  // listener para cambios de tamaño de ventana
  window.addEventListener('resize', handleResize);

  return () => {
    // Limpia estilos al desmontar
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    window.removeEventListener('resize', handleResize);
  };
}, [menuOpen]);


  return (
    <nav className="navbar container">
      <LogoButton onClick={scrollToHero}/>
      
      <NavbarMenu
        menuOpen={menuOpen}
        closeMenu={closeMenu}
        isAuthenticated={isAuthenticated}
        getLinkClass={getLinkClass}
        openModal={openModal}
        handleLogout={handleLogout}
      />
      
      <div 
        className={`menu-overlay ${menuOpen ? 'visible' : ''}`} 
        onClick={closeMenu}>
      </div>

      <NavbarToggleButtons
        toggleMenu={toggleMenu}
      />
    </nav>
  );
}

export default Navbar;
