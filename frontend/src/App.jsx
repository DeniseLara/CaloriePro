import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext'

import MainLayout from './components/layout/MainLayout';
import Home from './pages/private/Home'
import Dashboard from './pages/private/Dashboard'
import PublicPage from './pages/public/PublicPage';
import Loader from './components/ui/Loader';
import PrivateRoute from './PrivateRoute';
import NotFound from './pages/public/Notfound';


function App() {
  const [showModal, setShowModal] = useState(false);
  const { loading } = useAuth(); // Traemos setIsAuthenticated desde el contexto

  if (loading) {
    return (
      <Loader/>
    );
  }


  return (
      <Routes>
        <Route element={<MainLayout showModal={showModal} setShowModal={setShowModal} />}>

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
      </Route> 
      </Routes>
  );
}

export default App;
