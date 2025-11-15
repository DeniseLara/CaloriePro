import { GiBodyBalance } from "react-icons/gi";
import "./Loader.css";

function Loader({ text = "Cargando..." }) {
  return (
    <div className="loading-screen">
      
      <div className="loader-logo">
        <span className="part-1">
          Calorie<span className="part-2">Pro</span>
        </span>
        <GiBodyBalance className="logo-img" />
      </div>

      <div className="calorie-spinner"></div>

      <p className="loading-text">{text}</p>
    </div>
  );
}

export default Loader;
