import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import AuthFooter from './footer/AuthFooter';
import Modal from '../auth/Modal';

function MainLayout({ showModal, setShowModal }) {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar showModal={showModal} setShowModal={setShowModal} closeModal={() => setShowModal(false)} />
      <main className='main'>
        <Outlet />
      </main>
      {isAuthenticated ? <AuthFooter /> : <Footer />}
      {!isAuthenticated && (
        <Modal showModal={showModal} setShowModal={setShowModal} closeModal={() => setShowModal(false)}/>
      )}
    </>
  );
}

export default MainLayout;
