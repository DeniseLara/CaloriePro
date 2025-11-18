import "./Footer.css";
import {
  RiFacebookCircleLine,
  RiTwitterLine,
  RiInstagramLine,
} from "react-icons/ri";
import LogoButton from '../../ui/Button/LogoButton'


function Footer() {
  return (
    <footer className="footer section" role="contentinfo">
      <div className="footer__container container grid">
        <section className="footer-section principal">
          <span className="footer-logo"><LogoButton/></span>
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
       
        <div className="footer-section contact">
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
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CaloriePro. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
