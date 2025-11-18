import styles from './Hero.module.css'
import { useModal } from '../../context/ModalContext';
import { IoFitnessOutline } from "react-icons/io5";
import ProgressCard from './ProgressCard';
import { HeroCard, HeroContent } from '../ui/Animation/HeroSection';

function Hero({ benefitsRef }) {
  const { openModal } = useModal();

  const handleGetStartedClick = () => {
    openModal(); 
  };

  const handleLearnMoreClick = () => {
    benefitsRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  
  return (
    <section className={`section ${styles.hero}`} id="hero">
      <div className={`container grid ${styles.heroContainer}`}>

        <HeroContent>
        <div className={styles.heroContent}>
          <header className={styles.heroHeader}>
            <div className={styles.messageContainer}>
              <span><IoFitnessOutline/></span>
              <p className={styles.message}>
                Your health is our priority
              </p>
            </div>
            <h1 className={styles.heroTitle}>
              Build healthy <span>habits</span>, every single day
            </h1>
            <p className={styles.heroSubtitle}>
              CaloriePro will help you keep track of your 
              daily calories and achieve your goals.
            </p>
          </header>
        
          <div className={styles.heroActions}>
            <button 
              className={`${styles.heroButton} ${styles.started}`} 
              onClick={handleGetStartedClick}
              type='button'
              aria-label='go to sign up form'
            >
              Get started
            </button>

            <button 
              className={`${styles.heroButton} ${styles.learn}`}
              onClick={handleLearnMoreClick}
              type='button'
              aria-label='learn more about caloriepro web app'
            >
              <span className={styles.arrow}>
                <i className="ri-arrow-right-line"></i>
              </span>
                Learn more
            </button>
          </div>
        </div>
        </HeroContent>
          
        <HeroCard>
        <ProgressCard/>
        </HeroCard>

      </div>
    </section>
  );
}

export default Hero;