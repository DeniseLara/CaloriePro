import { GiBodyBalance } from "react-icons/gi";

const LogoButton = ({ onClick }) => {
  return (
    <button
      className="logo-name"
      onClick={onClick}
      type="button"
      aria-label="logo"
    >
      CaloriePro <GiBodyBalance className='logo-img'/>
    </button>
  );
}

export default LogoButton;
