import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export function useNavbar() {
  const { isAuthenticated, setIsAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeLink, setActiveLink] = useState("hero");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setActiveLink("home");
    } else {
      setActiveLink("hero");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveLink(path);
  }, [location]);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    try {
      await logout();       
      navigate("/");          
    } catch (err) {
    }
  };

  const scrollToHero = () => {
    const section = document.getElementById('hero');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getLinkClass = (link) => activeLink === link ? 'link active' : 'link';

  return {
    menuOpen,
    showModal,
    isAuthenticated,
    activeLink,
    toggleMenu,
    closeMenu,
    setShowModal,
    handleLogout,
    scrollToHero,
    getLinkClass
  };
}
