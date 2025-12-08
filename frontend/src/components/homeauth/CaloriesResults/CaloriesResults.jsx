import './CaloriesResults.css';
import { useFoodHistory } from '../../../hooks/useFoodHistory.jsx';
import NutritionChart from "./NutritionChart.jsx";


function CaloriesResults({ nutritionData, error }) {
  const { caloriesAction, handleAdd } = useFoodHistory();

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!nutritionData) {
    return null;
  }

  const { totalNutrients } = nutritionData;
  const calories = Math.round(totalNutrients?.ENERC_KCAL?.quantity || 0);
  

  return (
    <section className="results-container">
      <div className="results-content">
        <header className="heading-container">
          <h3 className="heading-title">Nutrition Facts</h3>
          <p className="heading-description">
            <strong>Food</strong>
            <span>{nutritionData?.ingredients || "No disponible"}</span>
          </p>
          <p className="heading-description">
            <strong>Calories</strong>
            <span>{calories.toFixed(0)} kcal</span>
          </p>
        </header>

        <div className="chart-and-nutrients">
          <div className="chart-wrapper">
            <article className="chart-container">
              <NutritionChart totalNutrients={totalNutrients} />
            </article>
            <span className="chart-label">Macronutrient Distribution</span>
          </div>
      
          <section className="nutrient-details">
            <ul className='nutrient-list'>
              <li className="nutrient">
                <strong>Proteins</strong>
                <div className="nutrient-value">
                  <span className="nutrient-amount">
                    {(totalNutrients?.PROCNT?.quantity || 0).toFixed(1)}
                  </span>
                  <span className="nutrient-unit">grams</span>
                </div>
              </li>

              <li className="nutrient">
                <strong>Fats</strong>
                <div className="nutrient-value">
                  <span className="nutrient-amount">
                    {(totalNutrients?.FAT?.quantity || 0).toFixed(1)}
                  </span>
                  <span className="nutrient-unit">grams</span>
                </div>
              </li>

              <li className="nutrient">
                <strong>Carbs</strong>
                <div className="nutrient-value">
                  <span className="nutrient-amount">
                    {(totalNutrients?.CHOCDF?.quantity || 0).toFixed(1)}
                  </span>
                  <span className="nutrient-unit">grams</span>
                </div>
              </li>
            </ul>
          </section>
        </div>
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