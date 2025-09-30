import { IoMdClose } from "react-icons/io";
import NavbarLinks from './NavbarLinks';

function NavbarMenu({
  menuOpen,
  closeMenu,
  isAuthenticated,
  getLinkClass,
  openModal,
  handleLogout
}) {
  
  return (
    <div className={`navbar-menu ${menuOpen ? 'show' : ''}`}>
      <ul className="navbar-list">
        <NavbarLinks 
          isAuthenticated={isAuthenticated} 
          getLinkClass={getLinkClass} 
          closeMenu={closeMenu} 
          openModal={openModal}
          handleLogout={handleLogout}
        />
      </ul>
      <button 
        className="nav-close" 
        onClick={closeMenu} 
        aria-label="Close menu"
        type='button'
      >
        <IoMdClose />
      </button>
    </div>
  );
}

export default NavbarMenu;
