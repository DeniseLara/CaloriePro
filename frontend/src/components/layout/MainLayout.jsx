import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import AuthFooter from './footer/AuthFooter';
import Modal from '../auth/Modal';

function MainLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar/>
      <main className='main'>
        <Outlet />
      </main>
      {isAuthenticated ? <AuthFooter /> : <Footer />}
      {!isAuthenticated && <Modal/>}
    </>
  );
}

export default MainLayout;
