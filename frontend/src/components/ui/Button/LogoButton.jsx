import { GiBodyBalance } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

function LogoButton() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
      } else {
      navigate('/'); 
      setTimeout(() => {
      window.location.hash = '#hero';  
      }, 100);
    }
  };

  return (
    <button
      className="logo-name"
      onClick={handleClick}
      type="button"
      aria-label="logo"
    >
      <span className="part-1">
        Calorie<span className="part-2">Pro</span>
      </span>
      <GiBodyBalance className='logo-img'/>
    </button>
  );
}

export default LogoButton;
