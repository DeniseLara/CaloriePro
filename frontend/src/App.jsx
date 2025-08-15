import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext'

import MainLayout from './components/layout/MainLayout';
import HomeAuthenticated from './pages/private/HomeAuth/HomeAuthenticated';
import Dashboard from './pages/private/Dashboard/Dashboard';
import HomePublic from './pages/public/HomePublic';
import Loader from './components/ui/Loader/Loader'
import PrivateRoute from './PrivateRoute';
import NotFound from './pages/public/Notfound';


function App() {
  const [showModal, setShowModal] = useState(false);
  const { loading } = useAuth(); 

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
        <HomePublic openSignUpModal={() => setShowModal(true)} />
        }
      />

      {/* Rutas protegidas*/} 
      <Route 
        path='/home'
        element={
        <PrivateRoute>
          <HomeAuthenticated/>
        </PrivateRoute>}
      />

      <Route 
        path='/dashboard'
        element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>}
      />
      </Route>

      {/* Ruta para páginas no encontradas */}
      <Route path='*' element={<NotFound />} />
  </Routes>
  );
}

export default App;
