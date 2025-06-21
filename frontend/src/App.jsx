import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext'

import Navbar from './components/layout/navbar/Navbar';
import Footer from './components/layout/footer/Footer'
import Modal from './components/auth/Modal';
import Home from './pages/private/Home'
import Dashboard from './pages/private/Dashboard'
import AuthFooter from './components/layout/footer/AuthFooter';
import PrivateRoute from './PrivateRoute';
import PublicPage from './pages/public/PublicPage';
import Loader from './components/ui/Loader';



function App() {
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated, loading } = useAuth(); // Traemos setIsAuthenticated desde el contexto

  if (loading) {
    return (
      <Loader/>
    );
  }


  return (
    <div className='app'>
      <Navbar showModal={showModal} setShowModal={setShowModal} closeModal={() => setShowModal(false)} />

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
       <PrivateRoute isAuthenticated={isAuthenticated}>
        <Home/>
       </PrivateRoute>}
       />

       <Route 
      path='/dashboard'
      element={
       <PrivateRoute isAuthenticated={isAuthenticated}>
        <Dashboard/>
       </PrivateRoute>}
       /> 
      </Routes>
    </main>

      {/* Mostrar Footer según autenticación */}
      {isAuthenticated ? <AuthFooter /> : <Footer />}
    
      {/* Mostrar el Modal solo si no está autenticado */}
      {!isAuthenticated && (
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