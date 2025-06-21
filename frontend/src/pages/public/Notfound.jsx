import './Notfound.css'
import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

function NotFound() {
  const { isAuthenticated } = useAuth();
  const redirectPath = isAuthenticated ? "/home" : "/";

  return (
      <div className="not-found container">
        <h1>Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to={redirectPath} className="btn-return">Go back to homepage</Link>
      </div>
    );
  };
  
export default NotFound;
  