import styles from './HowItWorks.module.css'
import { StepsHeader, StepCard } from '../ui/Animation/StepSection';

function HowItWorks() {
  
  return(
    <section className={`section ${styles.how}`} id="howitworks">
      <div className={`container grid ${styles.howContainer}`}>
        <StepsHeader>
        <header className={styles.howHeader}>
          <h2 className={`section__title ${styles.howTitle}`}>How It Works</h2>
          <p>
            Discover how easy it is to start tracking your calories and reach your goals!
          </p>
        </header>
        </StepsHeader>

        <ul className={styles.howList}>
          <StepCard>
          <div className={styles.howCard}>
            <h3>01</h3>
            <h4>Sign Up</h4>
            <p>Create an account in seconds to get started.</p>
          </div>
          </StepCard>
          
          <StepCard>
          <div className={styles.howCard}>
            <h3>02</h3>
            <h4>Search & Save</h4>
            <p>
              Find your favorite foods and save them for easy tracking.
            </p>
          </div>
          </StepCard>
          
          <StepCard>
          <div className={styles.howCard}>
            <h3>03</h3>
            <h4>Track Progress</h4>
            <p>
              Monitor your calorie intake with a personalized dashboard.
            </p>
          </div>
          </StepCard>
        </ul>
      </div>
    </section>
  );
}

export default HowItWorks;