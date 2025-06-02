import { ClipLoader } from 'react-spinners';

function Loader() {
  return (
    <div 
      className="loading-container"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
    <ClipLoader size={60} color="#4fa94d" loading={loading} />
     <p>Loading history...</p>
    </div>
  );
}

export default Loader;
