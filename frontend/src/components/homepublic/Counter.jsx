import './Counter.css'

function Counter() {
  const foodCount = 1000;
  const userCount = 500;
  const caloriesTracked = 300000;
  
  return (
    <section className="dynamic-counter">
      <h2 className="dynamic-title">Global Statistics</h2>

      <div className="counter-grid container">
        <article className="counter-card" role="region" aria-label="Food count">
          <h3>+ {foodCount}</h3>
          <p>Foods in our database</p>
        </article>

        <article className="counter-card" role="region" aria-label="User count">
          <h3>+ {userCount}</h3>
          <p>Registered users</p>
        </article>

        <article className="counter-card" role="region" aria-label="Calories tracked count">
          <h3>+ {caloriesTracked.toLocaleString()}</h3>
          <p>Calories recorded by users</p>
        </article>
      </div>
    </section>
  );
}

export default Counter;
