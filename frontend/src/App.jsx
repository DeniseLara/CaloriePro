import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'

import MainLayout from './components/layout/MainLayout';
import HomeAuthenticated from './pages/private/HomeAuth/HomeAuthenticated';
import Dashboard from './pages/private/Dashboard/Dashboard';
import HomePublic from './pages/public/HomePublic';
import Loader from './components/ui/Loader/Loader'
import PrivateRoute from './PrivateRoute';
import NotFound from './pages/public/Notfound';
import UserProfile from './pages/private/Profile/UserProfile';


function App() {
  const { loading, isAuthenticated } = useAuth(); 

  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    <main className='main'>
    <Routes>
      {/* Rutas públicas */}
      <Route element={<MainLayout />}>
      <Route
        path="/"
        element={!isAuthenticated 
        ? <HomePublic />
        : <Navigate to="/dashboard" replace/>}
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

      <Route 
        path='/profile'
        element={
        <PrivateRoute>
          <UserProfile/>
        </PrivateRoute>}
      />
      </Route>

      {/* Ruta para páginas no encontradas */}
      <Route path='*' element={<NotFound />} />
  </Routes>
  </main>
  );
}

export default App;
