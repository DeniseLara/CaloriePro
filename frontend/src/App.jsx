import './index.css'
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/authContext'
import { onAuthStateChanged, auth} from './firebaseconfig/firebase'; 

import Navbar from './components/layout/navbar/Navbar';
import Footer from './components/layout/footer/Footer'
import Modal from './components/auth/Modal';
import Home from './pages/private/Home'
import Dashboard from './pages/private/Dashboard'
import AuthFooter from './components/layout/footer/AuthFooter';
import PrivateRoute from './PrivateRoute';
import PublicPage from './pages/public/PublicPage';
import Loader from './components/ui/Loader';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuth(); // Traemos setIsAuthenticated desde el contexto
  const [loading, setLoading] = useState(true);

 // Verifica el estado de autenticación al cargar la página
 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAuthenticated(true);

    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Deja de cargar una vez que el estado se determina
  });

  return () => unsubscribe();
}, []);


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
