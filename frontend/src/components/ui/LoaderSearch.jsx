import { ClipLoader } from 'react-spinners';
import './Loaders.css'

const Loader = ({size = 60, color="#4D7CFE"}) => {
  return (
    <div 
      className="loading-container"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
    <ClipLoader size={size} color={color} loading={true} />
    </div>
  );
}

export default Loader;
