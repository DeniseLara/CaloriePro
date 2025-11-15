import { forwardRef } from 'react';
import { FaUtensils, FaChartPie, FaClipboardList } from "react-icons/fa";
import styles from './Card.module.css'

const features = [
  {
    icon: <FaUtensils className={styles.icon}/>,
    title: "Calorie tracker",
    description: "Keep precise track of your daily calorie intake."
  },
  {
    icon: <FaChartPie className={styles.icon}/>,
    title: "Dashboard",
    description: "View your progress and set goals easily."
  },
  {
    icon: <FaClipboardList className={styles.icon}/>,
    title: "Food History",
    description: "Review all the foods you've logged and track your calorie intake."
  }
];


const Card = forwardRef(function Card(props, ref) {

  return(
    <section className={`section ${styles.benefits}`} id="benefits" ref={ref}>
      <div className={`container grid ${styles.benefitsContainer}`}>
        <header className={styles.benefitHeader}>
      <h2 className={`section__title ${styles.benefitsTitle}`}>What makes this app powerful</h2>
      <p className={styles.benefitsDescription}>All the tools you need to reach your health goals in one place.</p>
      </header>

      <div className={styles.benefitsList}>
      {features.map((feature, index) => (
        <article key={index} className={styles.benefitCard}>
            <span className={styles.featureIcon}>{feature.icon}</span>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
          <p className={styles.featureDescription}>{feature.description}</p>
        </article>
      ))}
      </div>
      </div>
    </section>
  )
});

export default Card;