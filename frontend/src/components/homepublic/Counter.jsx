import styles from './Counter.module.css'

function Counter() {
  const foodCount = 1000;
  const userCount = 500;
  const caloriesTracked = 300000;
  
  return (
    <section className={`section ${styles.stats}`}>
      <div className={`${styles.statsContainer}`}>

      <div className={`container ${styles.statsGrid}`}>
        <article className={styles.statsCard} role="region" aria-label="Food count">
          <h3>{foodCount}+</h3>
          <h4>Foods in Database</h4>
        </article>

        <article className={styles.statsCard} role="region" aria-label="User count">
          <h3>{userCount}+</h3>
          <h4>Active Users</h4>
        </article>

        <article className={styles.statsCard} role="region" aria-label="Calories tracked count">
          <h3>{caloriesTracked.toLocaleString()}+</h3>
          <h4>Calories Tracked</h4>
        </article>

        <article className={styles.statsCard} role="region" aria-label="Calories tracked count">
          <h3>4.8 ★</h3>
          <h4>Rating</h4>
        </article>
      </div>
      </div>
    </section>
  );
}

export default Counter;
