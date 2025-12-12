import './HomeAuthenticated.css';
import { GiBodyBalance } from "react-icons/gi";
import { useAuth } from "../../../context/AuthContext";
import { useSearchHandler } from "../../../hooks/useSearchHandler";
import { useEdamamApi } from '../../../api/EdamamApi';

import Search from '../../../components/homeauth/Search/Search';
import CaloriesResults from '../../../components/homeauth/CaloriesResults/CaloriesResults';

function HomeAuthenticated() {
  const { userName } = useAuth();
  const { nutritionData, analyzeNutrition, error } = useEdamamApi();
  const { 
    isLoading, 
    errorMessage, 
    handleSearch,
    searchQuery,
    setSearchQuery
  } = useSearchHandler({ analyzeNutrition });

  return (
    <section className="home-container section">
      <div className="home__container container">
        <h1 className="home-title">
          Welcome to 
          <span className="part-1">
            Calorie<span className="part-2">Pro</span>
          </span>
          <GiBodyBalance className='logo-img'/>
        </h1>

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
              error={error} 
            />
          ) : (
            error && 
              <p className="error-message" role="alert">
                {error}
              </p>
          )}
        </section>
      
        {errorMessage && 
          <p className="error-message" role="alert">
            {errorMessage}
          </p>}
      </div>
    </section>
  );
}

export default HomeAuthenticated;