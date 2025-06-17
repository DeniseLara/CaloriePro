import './Home.css';
import { useState } from "react";
import { useCalories } from "../../context/CaloriesContext";
import { useAuth } from "../../context/AuthContext";
import { useEdamamApi } from "../../api/EdamamApi";
import { useSearchHandler } from "../../hooks/useSearchHandler";

import Search from "../../components/homeauth/Search"; 
import CaloriesResults from '../../components/homeauth/CaloriesResults'; 

function Home() {
  const { userName } = useAuth();
  const { caloriesConsumed, addCalories} = useCalories();
  const [searchQuery, setSearchQuery] = useState("");
  const {nutritionData, analyzeNutrition, nutritionError} = useEdamamApi();
  const { isLoading, errorMessage, handleSearch } = useSearchHandler({ searchQuery, analyzeNutrition });


  return (
    <section className="home-container container">
      <h1 className="home-title">Welcome to CaloriePro</h1>

      {userName && (
        <p className="home-description">
          ¡Hi, {userName}! Keep track of what you consume with just a search.
        </p>
      )}

        <section>
          <Search 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          isLoading={isLoading}
          errorMessage={errorMessage}
          handleSearch={handleSearch}
          />

          {nutritionData ? (
            <CaloriesResults 
              nutritionData={nutritionData} 
              error={nutritionError} 
              onAddCalories={addCalories}  // Usamos el contexto para agregar calorías
              caloriesConsumed={caloriesConsumed}
            />
          ) : (
            nutritionError && 
            <p className="error-message" role="alert">
              {nutritionError}
            </p>
          )}
        </section>
      
      {errorMessage && 
      <p className="error-message" role="alert">
        {errorMessage}
      </p>}
    </section>
  );
}

export default Home;