import "./Footer.css";
import {
  RiFacebookCircleLine,
  RiTwitterLine,
  RiInstagramLine,
} from "react-icons/ri";


function Footer() {
  
  return (
    <footer className="footer container" role="contentinfo">
      <div className="footer-container">

      <section className="footer-section principal">
        <h3>CaloriePro</h3>
        <p>
          Your ideal tool to manage calories and achieve your health goals.
        </p>
      </section>

      <nav className="footer-section">
        <h4>Quick Links</h4>
        <ul className="footer-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#howitworks">How it Works</a></li>
          <li><a href="#benefits">Benefits</a></li>
        </ul>
      </nav>
       
      <address className="footer-section contact">
        <h4>Contact Us</h4>
        <ul className="social-icons">
          <li>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Facebook"
          >
            <RiFacebookCircleLine />
          </a>
          </li>
          <li>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Twitter"
          >
            <RiTwitterLine />
          </a>
          </li>
          <li>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram"
          >
            <RiInstagramLine />
          </a>
          </li>
        </ul>
      </address>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CaloriePro. All rights reserved.</p>
      </div>
      </footer>
  );
}

export default Footer;
