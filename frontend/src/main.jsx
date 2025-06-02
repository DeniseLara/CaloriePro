import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import './index.css';
import { CaloriesProvider } from './pages/private/context/CaloriesContext.jsx';
import { AuthProvider } from './context/authContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Router>
    <AuthProvider>
    <CaloriesProvider> 
      <App />
      </CaloriesProvider>
    </AuthProvider>
    </Router>
    </StrictMode>
);
