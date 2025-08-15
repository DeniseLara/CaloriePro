import './Footer.css'

function AuthFooter() {

  return (
    <footer className="footer container">
      <div className="footer-container">

      <section className="footer-section principal">
        <h3>CaloriePro</h3>
        <p>
          Your ideal tool to manage calories and achieve your health goals.
        </p>
      </section>
       
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
              <i className="ri-facebook-circle-line"></i>
            </a>
          </li>
          <li>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter"
            >
              <i className="ri-twitter-line"></i>
            </a>
          </li>
          <li>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
            >
              <i className="ri-instagram-line"></i>
            </a>
          </li>
        </ul>
      </address>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} CaloriePro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default AuthFooter;
