import './Notfound.css'
import { Link } from "react-router-dom";

function NotFound() {
  return (
      <div className="not-found container">
        <h1>Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-return">Go back to homepage</Link>
      </div>
    );
  };
  
export default NotFound;
  