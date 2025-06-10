import { ClipLoader } from 'react-spinners';
import './Loaders.css'

const Loader = ({size = 60, color = "#4fa94d", text="Loading..."}) => {
  return (
    <div 
      className="loading-container"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
    <ClipLoader size={size} color={color} loading={true} />
     <p>{text}</p>
    </div>
  );
}

export default Loader;
