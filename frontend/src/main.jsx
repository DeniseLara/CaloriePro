import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { NutritionProvider } from './context/NutritionContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ModalProvider } from './context/ModalContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ModalProvider>
        <AuthProvider>
          <NutritionProvider> 
            <App/>
          </NutritionProvider>
        </AuthProvider>
      </ModalProvider>
    </Router>
  </StrictMode>
);
