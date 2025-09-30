import './Hero.css'
import { useModal } from '../../context/ModalContext';

function Hero({ benefitsRef}) {
  const { openModal } = useModal();

  const handleGetStartedClick = () => {
    openModal(); 
  };

  const handleLearnMoreClick = () => {
    benefitsRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  
  return (
    <section className='hero container'>
        <header className="hero-text">
          <h1 className="hero-title">Keep track of your calorie intake</h1>
          <p className="hero-subtitle">
            CaloriePro will help you keep track of your 
            daily calories and achieve your goals.
          </p>
        </header>
        
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
            <span className="arrow">
              <i className="ri-arrow-right-line"></i>
            </span>
              Learn more
          </button>
        </div>
    </section>
  );
}

export default Hero;