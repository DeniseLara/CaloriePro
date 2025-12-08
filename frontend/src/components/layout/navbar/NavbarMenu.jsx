import { IoMdClose } from "react-icons/io";
import NavbarLinks from './NavbarLinks';

function NavbarMenu({
  menuOpen,
  closeMenu
}) {
  
  return (
    <div className={`navbar-menu ${menuOpen ? 'show' : ''}`}>
      <ul className="navbar-list">
        <NavbarLinks />
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
