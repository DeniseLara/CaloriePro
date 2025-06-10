import './Hero.css'
import PropTypes from 'prop-types';

const Hero = ({openSignUpModal, benefitsRef}) => {

  const handleGetStartedClick = () => {
    openSignUpModal(); 
  };

  const handleLearnMoreClick = () => {
    benefitsRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  
  return (
    <div className='hero container'>
      <div className="hero-text">
        <h1 className="hero-title">Keep track of your calorie intake</h1>
        <p className="hero-subtitle">
          CaloriePro will help you keep track of your daily calories and achieve your goals.
        </p>
        <div className="hero-buttons">
          <button 
          className='hero-button started' 
          onClick={handleGetStartedClick}
          type='button'
          aria-label='go to sign up form'
          >
            Get started
          </button>

          <button 
          className='hero-button learn' 
          onClick={handleLearnMoreClick}
          type='button'
          aria-label='learn more about caloriepro web app'
          >
            <span className="arrow"><i className="ri-arrow-right-line"></i></span>
            Learn more
          </button>

        </div>
      </div>
    </div>
  );
}

// Validación de las props
Hero.propTypes = {
  openSignUpModal:PropTypes.func.isRequired,
};

export default Hero;