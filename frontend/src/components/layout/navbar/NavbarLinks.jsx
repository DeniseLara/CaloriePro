import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

function NavbarLinks({ 
  isAuthenticated, 
  getLinkClass, 
  closeMenu, 
  setShowModal, 
  handleLogout 
}) {

  return (
    <>
      <li>
        {!isAuthenticated ? (
          <Link
            className={getLinkClass('hero')}
            to="hero"
            aria-label='go to home page'
            smooth={true}
            duration={500}
            onClick={closeMenu}
            onSetActive={() => {}}
          >
            Home
          </Link>
        ) : (
          <RouterLink
            className={getLinkClass('home')}
            to="/home"
            aria-label='go to home page'
            onClick={closeMenu}
          >
            Home
          </RouterLink>
        )}
      </li>

      {!isAuthenticated ? (
        <>
          <li>
            <Link
              to="testimonials"
              smooth={true}
              offset={-70}
              duration={200}
              aria-label='go to testimonials section'
              className={getLinkClass('testimonials')}
              onSetActive={() => {}}
              onClick={closeMenu}
            >
              Testimonials
            </Link>
          </li>
          <li>
            <Link
              to="howitworks"
              smooth={true}
              offset={-70}
              duration={200}
              aria-label='go to how it works section'
              className={getLinkClass('howitworks')}
              onSetActive={() => {}}
              onClick={closeMenu}
            >
              How it Works
            </Link>
          </li>
          <li>
            <button
              className="btn-outline"
              onClick={() => setShowModal(true)}
              type='button'
              aria-label='Sign up'
            >
              Sign Up
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <RouterLink
              className={getLinkClass('dashboard')}
              to="/dashboard"
              aria-label='go to dashboard page'
              onClick={closeMenu}
            >
              Dashboard
            </RouterLink>
          </li>
          <li>
            <button
              className="btn-outline"
              onClick={handleLogout}
              type='button'
              aria-label='log out'
            >
              Logout
            </button>
          </li>
        </>
      )}
    </>
  );
}

export default NavbarLinks;
