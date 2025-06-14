import { Navigate } from 'react-router-dom';
import { useAuth } from './context/authContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Usa el contexto directamente

  if (!isAuthenticated) {
    return <Navigate to="/" replace/>;
  }

  return children;
}



export default PrivateRoute;
