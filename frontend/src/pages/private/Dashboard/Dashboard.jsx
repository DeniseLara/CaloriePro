import './Dashboard.css';
import { useUserData } from '../../../hooks/useUserData.jsx';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useFoodHistory } from '../../../hooks/useFoodHistory.jsx';
import { useNutrition } from '../../../context/NutritionContext.jsx';

import MacroPanel from '../../../components/dashboard/Macros/MacroPanel.jsx';
import Historial from '../../../components/dashboard/Historial/Historial.jsx';
import RadialChart from '../../../components/dashboard/Charts/RadialChart.jsx';
import SkeletonDashboard from '../../../components/ui/Skeleton/Skeleton.jsx'


function Dashboard() {
  const { user } = useAuth();
  const { macros, caloriesConsumed } = useNutrition();
  const { foodHistory, handleAdd} = useFoodHistory(user);

  const {
    userData,
    isEditing,
    editedData,
    toggleEditing,
    handleInputChange,
    closeModal,
    dailyGoal,
    isLoading,
    setIsEditing,
    saveUserProfile,
    showModalUser,
    saveError,
    setSaveError,
    isSaving,  
  } = useUserData(); 

  const caloriesToDisplay = Math.round(caloriesConsumed); 

  if (!user) {
    return (
    <div role="alert" aria-live="assertive" className="error-message">
      <p>
        No estás autenticado o no se pudo obtener tu correo electrónico.
      </p>
    </div>
    );
  };


  // Si está cargando los datos
  if (isLoading) {
    return (
      <section className="dashboard container" aria-busy="true" aria-live="polite">
        <SkeletonDashboard/>
      </section>
    );
  }

  return (
    <section className="dashboard section" aria-live="polite" aria-busy={isSaving}>
      <div className="dashboard__container container">
      <header className="dashboard-container" role="banner">
        <h1 tabIndex={-1} className="dashboard-container-title">
          Welcome to your Dashboard
        </h1>

        <section 
          className="dashboard-container-descrip" 
          aria-label="Resume of your goals and daily consume of calories"
        >
          <p className="dashboard-container-number">
            Goal of the day <strong>{dailyGoal}</strong>
          </p>
          <p className="dashboard-container-cal">
            Calories consumed <strong>{caloriesToDisplay}</strong>
          </p>
        </section>
      </header>

      <section className="flex-container"aria-label="Charts and user profile">
        <RadialChart
          caloriesConsumed={caloriesConsumed} 
          dailyGoal={dailyGoal}
          protein={userData.protein || 120}  
          carbs={userData.carbs || 250}
          fats={userData.fats || 60}
        />

        <MacroPanel macros={macros}/>
        </section>

        {/*<UserProfile
          userData={userData}
          isEditing={isEditing}
          editedData={editedData}
          handleEditToggle={toggleEditing}
          handleChange={handleInputChange}
          handleSubmit={handleProfileSubmit}
          dailyGoal={dailyGoal}
          isSaving={isSaving}
          userUid={user.uid}
          showModalUser={showModalUser}
          onCloseModal={closeModal}
        />
      </section>

      {saveError && 
      <section role="alert" aria-live="assertive" className="error-message">
        <p>{saveError}</p>
      </section>
      } */}
      
      <section aria-label="Food history">
      <Historial 
        foodHistory={foodHistory} 
        handleAdd={handleAdd} 
        loading={isLoading}
        error={null}
      />
      </section>
      </div>
  </section>
  );
}

export default Dashboard;