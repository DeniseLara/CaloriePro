import "./Footer.css";
import {
  RiFacebookCircleLine,
  RiTwitterLine,
  RiInstagramLine,
} from "react-icons/ri";


function Footer() {
  return (
      <footer className="footer container" role="contentinfo">
        {/* Información de la aplicación */}
       <div className="footer-container">

        <section className="footer-section principal">
          <h3>CaloriePro</h3>
          <p>Your ideal tool to manage calories and achieve your health goals.</p>
        </section>

        {/* Enlaces rápidos */}
        <nav className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#hero">Home</a></li>
            <li><a href="#howitworks">How it Works</a></li>
            <li><a href="#benefits">Benefits</a></li>
          </ul>
        </nav>
       
        {/* Redes sociales */}
        <section className="footer-section contact">
          <h4>Contact Us</h4>
          <address className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <RiFacebookCircleLine />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <RiTwitterLine />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <RiInstagramLine />
            </a>
          </address>
        </section>
        </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CaloriePro. All rights reserved.</p>
      </div>
      </footer>
  );
}

export default Footer;
