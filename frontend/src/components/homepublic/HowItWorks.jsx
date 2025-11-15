import styles from './HowItWorks.module.css'
import { RiUserAddLine, RiSearchEyeLine, RiBarChartBoxLine } from 'react-icons/ri';

function HowItWorks() {
  
  return(
    <section className={`section ${styles.how}`} id="howitworks">
      <div className={`container grid ${styles.howContainer}`}>
      <header className={styles.howHeader}>
        <h2 className={`section__title ${styles.howTitle}`}>How It Works</h2>
        <p>
          Discover how easy it is to start tracking your calories and reach your goals!
        </p>
      </header>

      <ul className={styles.howList}>
        <li className={styles.howCard}>
          {/*<span className={styles.iconContainer}>
            <RiUserAddLine aria-hidden="true"/>
          </span>*/}
          <h3>01</h3>
          <h4>Sign Up</h4>
          <p>Create an account in seconds to get started.</p>
        </li>

        <li className={styles.howCard}>
          {/*<span className={styles.iconContainer}>
            <RiSearchEyeLine aria-hidden="true"/>
          </span>*/}
          <h3>02</h3>
          <h4>Search & Save</h4>
          <p>
            Find your favorite foods and save them for easy tracking.
          </p>
        </li>

        <li className={styles.howCard}>
          {/*<span className={styles.iconContainer}>
            <RiBarChartBoxLine aria-hidden="true"/>
          </span>*/}
          <h3>03</h3>
          <h4>Track Progress</h4>
          <p>
            Monitor your calorie intake with a personalized dashboard.
          </p>
        </li>
      </ul>
      </div>
    </section>
  );
}

export default HowItWorks;