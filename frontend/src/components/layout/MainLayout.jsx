import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import AuthFooter from './footer/AuthFooter';
import Modal from '../auth/Modal';

function MainLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="layout">
      <Navbar/>
      <main className="main-content">
        <Outlet />
      </main>
      {isAuthenticated ? <AuthFooter /> : <Footer />}
      {!isAuthenticated && <Modal/>}
    </div>
  );
}

export default MainLayout;
