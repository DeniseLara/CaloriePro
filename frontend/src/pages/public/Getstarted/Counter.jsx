import { useEffect, useState } from "react";
import './Counter.css'

function Counter () {
  const [foodCount, setFoodCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [caloriesTracked, setCaloriesTracked] = useState(0);

  useEffect(() => {
    // Simula llamadas a la API para obtener datos
    const fetchCounts = async () => {
      try {
        // Llamada simulada a Edamam Food Database API
        setFoodCount(1000); // Simula 1000 alimentos en la API

        // Llamada simulada a la otra API de recetas
        setUserCount(500); // Simula 500 recetas disponibles

        // Número simulado de calorías calculadas por los usuarios
        setCaloriesTracked(300000); // 300,000 calorías calculadas
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, []);

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
