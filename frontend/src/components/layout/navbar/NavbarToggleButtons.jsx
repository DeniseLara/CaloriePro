import { RiMenu3Fill } from "react-icons/ri";

const NavbarToggleButtons = ({ toggleMenu }) => {
  
  return (
    <button 
      className="nav-toggle" 
      onClick={toggleMenu} 
      aria-label="Open menu"
      type='button'
    >
      <RiMenu3Fill/>
    </button>
  );
}

export default NavbarToggleButtons;
