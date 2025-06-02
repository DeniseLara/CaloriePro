import { useCalories } from "../../context/CaloriesContext.jsx";
import { useAuth } from "../../../../context/authContext.jsx";
import { useFoodHistory } from '../hooks/useFoodHistory.jsx';

import NutritionChart from "./NutritionChart.jsx";
import PropTypes from "prop-types";
import './CaloriesResults.css';


function CaloriesResults({ nutritionData, error }) {
  const { user } = useAuth();
  const { caloriesConsumed, addCalories } = useCalories(); // Obtenemos el contexto de calorías
  const { foodHistory, caloriesAction, handleAdd } = useFoodHistory(user, caloriesConsumed, addCalories, nutritionData);


   if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!nutritionData) {
    return null;
  }

  const { totalNutrients } = nutritionData;
  const calories = totalNutrients?.ENERC_KCAL?.quantity || 0;
  

  return (
    <div className="results-container container">
      <div className="results-content">

      <div className="heading-container">
        <h3 className="heading-title">Nutrition facts</h3>
        <p className="heading-description">
          <strong>Food:</strong> {nutritionData?.ingredients || "No disponible"}
          </p>

        <p className="heading-description">
          <strong>Calories:</strong> {calories.toFixed(1)} kcal
          </p>
      </div>

      {/* Gráfico Circular */}
      <div className="chart-container">
        <NutritionChart totalNutrients={totalNutrients} />
      </div>
      
      {/* Detalles Nutricionales */}
      <div className="nutrient-details">
        <div className="nutrient"><strong>Proteins:</strong> {(totalNutrients?.PROCNT?.quantity || 0).toFixed(1)} g</div>
        <div className="nutrient"><strong>Fats:</strong> {(totalNutrients?.FAT?.quantity || 0).toFixed(1)} g</div>
        <div className="nutrient"><strong>Carbohydrates:</strong> {(totalNutrients?.CHOCDF?.quantity || 0).toFixed(1)} g</div>
      </div>
      </div>

     {/* Mostrar el botón de agregar, o mensaje si ya fue agregado */}
     {caloriesAction === null ? (
      <button className="nutrient-add-btn" onClick={handleAdd}>Add calories</button>
    ) : caloriesAction === "added" ? (
      <p className="success-message">¡Food added!</p>
    ) : (
      <p className="error-message">¡This food has already been added!</p>
    )}

    
    </div>

  );
} 


// Validación de las props
CaloriesResults.propTypes = {
  nutritionData: PropTypes.object.isRequired, 
  error: PropTypes.string,
};

export default CaloriesResults;