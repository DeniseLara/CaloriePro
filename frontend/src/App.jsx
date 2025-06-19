import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext'

import Navbar from './components/layout/navbar/Navbar';
import Footer from './components/layout/footer/Footer'
import Modal from './components/auth/Modal';
import Home from './pages/private/Home'
import Dashboard from './pages/private/Dashboard'
import AuthFooter from './components/layout/footer/AuthFooter';
import PublicPage from './pages/public/PublicPage';
import Loader from './components/ui/Loader';
import PrivateRoute from './PrivateRoute';
import NotFound from './Notfound'


function App() {
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated, loading } = useAuth(); // Traemos setIsAuthenticated desde el contexto
  const location = useLocation();
  
  // Rutas válidas
  const validPaths = ['/', '/home', '/dashboard'];

  // Si es una ruta 404
  const isNotFound = !validPaths.includes(location.pathname);

  if (loading) {
    return (
      <Loader/>
    );
  }


  return (
    <div className='app'>
    {!isNotFound && (
      <Navbar showModal={showModal} setShowModal={setShowModal} closeModal={() => setShowModal(false)} />
    )}
    <main className='main'>
      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/"
          element={
          <PublicPage openSignUpModal={() => setShowModal(true)} />
          }
        />

        {/* Rutas protegidas*/} 
      <Route 
      path='/home'
      element={
       <PrivateRoute>
        <Home/>
       </PrivateRoute>}
       />

       <Route 
      path='/dashboard'
      element={
       <PrivateRoute>
        <Dashboard/>
       </PrivateRoute>}
       /> 

      {/* Ruta para páginas no encontradas */}
      <Route path="*" element={<NotFound />} />
      </Routes>
    </main>

      {/* Mostrar Footer según autenticación */}
      {!isNotFound && (isAuthenticated ? <AuthFooter /> : <Footer />)}
    
      {/* Mostrar el Modal solo si no está autenticado */}
      {!isNotFound && !isAuthenticated && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          closeModal={() => setShowModal(false)}
        />
      )}
  </div>
  );
}

export default App;
