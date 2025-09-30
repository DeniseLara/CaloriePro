import './CaloriesResults.css';

import { useAuth } from "../../../context/AuthContext.jsx";
import { useFoodHistory } from '../../../hooks/useFoodHistory.jsx';

import NutritionChart from "./NutritionChart.jsx";


function CaloriesResults({ nutritionData, error }) {
  const { user } = useAuth();
  const { caloriesAction, handleAdd } = useFoodHistory(user);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!nutritionData) {
    return null;
  }

  const { totalNutrients } = nutritionData;
  const calories = Math.round(totalNutrients?.ENERC_KCAL?.quantity || 0);
  

  return (
    <section className="results-container container">
      <div className="results-content">
        <header className="heading-container">
        <h3 className="heading-title">Nutrition facts</h3>
          <p className="heading-description">
            <strong>Food:</strong> {nutritionData?.ingredients || "No disponible"}
          </p>

          <p className="heading-description">
            <strong>Calories:</strong> {calories.toFixed(1)} kcal
          </p>
        </header>

        <article className="chart-container">
          <NutritionChart totalNutrients={totalNutrients} />
        </article>
      
        <section className="nutrient-details">
          <ul className='nutrient-list'>
            <li className="nutrient"><strong>Proteins:</strong> 
              {(totalNutrients?.PROCNT?.quantity || 0).toFixed(1)} g
            </li>
            <li className="nutrient"><strong>Fats:</strong> 
              {(totalNutrients?.FAT?.quantity || 0).toFixed(1)} g
            </li>
            <li className="nutrient"><strong>Carbohydrates:</strong> 
              {(totalNutrients?.CHOCDF?.quantity || 0).toFixed(1)} g
            </li>
          </ul>
        </section>
      </div>

      {caloriesAction === null ? (
        <button 
          className="nutrient-add-btn" 
          onClick={() => handleAdd(nutritionData)}
          >
            Add calories
        </button>
        ) : caloriesAction === "added" ? (
          <p className="success-message">¡Food added!</p>
        ) : (
          <p className="error-message">¡This food has already been added!</p>
        )}
    </section>
  );
} 

export default CaloriesResults;