import  { useState, useCallback } from "react";
import './Dashboard.css';

import { useUserData } from "./hooks/useUserData.jsx";
import { useCalories } from "../context/CaloriesContext.jsx";
import { useAuth } from "../../../context/authContext.jsx";

import UserProfile from './UserProfile/UserProfile.jsx';
import Historial from './Historial/Historial.jsx';
import RadialChart from './components/RadialChart.jsx'


function Dashboard() {
    const {
    userData,
    isEditing,
    foodHistory,
    dailyGoal,
    isLoading,
    setIsEditing,
    setUserData,  
    saveUserProfile,  
    handleAddFoodToHistory
  } = useUserData(); 

  const [editedData, setEditedData] = useState({
    age: userData?.age || '',
    gender: userData?.gender || 'male',
    goal: userData?.goal || 'lose',
    weight: userData?.weight || '',
    height: userData?.height || '',
    activityLevel: userData?.activityLevel || 'sedentary',
    calorieAdjustment: userData?.calorieAdjustment || ''
  });
  const [isSaving, setIsSaving] = useState(false); // Estado para manejar el loading del guardado
  const [saveError, setSaveError] = useState(null); // Para manejar errores de guardado
  
  const { user } = useAuth();
  // Obtenemos el contexto de calorías
  const { caloriesConsumed } = useCalories(); 
  const caloriesToDisplay = Math.round(caloriesConsumed); 


  if (!user) {
    return (
    <main role="alert" aria-live="assertive" className="error-message">
      <p>
      Error: No estás autenticado o no se pudo obtener tu correo electrónico.
      </p>
    </main>
    );
  };
  

  // Manejo del envío del perfil editado
  const handleProfileSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSaving(true);  // Muestra el loading
    setSaveError(null); // Restablecer cualquier error previo
    
    try {
      // Guardamos el perfil editado en Firestore usando el email del usuario
      await saveUserProfile(editedData, user.uid);  // Guardamos los datos en Firestore con el correo del usuario
      setIsSaving(false);  // Desactiva el loading
      setIsEditing(false);  // Desactiva el modo de edición
    } catch (error) {
      setIsSaving(false);  // En caso de error
      setSaveError("Error al guardar perfil. Intenta nuevamente.");
      console.error("Error al guardar perfil: ", error);
    }
  }, [editedData, saveUserProfile, setIsEditing, user.uid]);

  // Manejador para cambios en formulario
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Toggle modo edición
  const toggleEditing = useCallback(() => setIsEditing(prev => !prev), [setIsEditing]);

  // Si está cargando los datos
  if (isLoading) {
    return (
     <main aria-busy="true" aria-live="polite" className="loading-message">
        <p>Cargando...</p>
      </main>
    );
  }

  return (
    <main className="dashboard container" aria-live="polite" aria-busy={isSaving}>
    <header className="dashboard-container" role="banner">
        <h1 tabIndex={-1} className="dashboard-container-title">Welcome to your Dashboard</h1>
        <section className="dashboard-container-descrip" aria-label="Resume of your goals and daily consume of calories">
          <p className="dashboard-container-number">Goal of the day <strong>{dailyGoal}</strong></p>
          <p className="dashboard-container-cal">Calories consumed <strong>{caloriesToDisplay}</strong></p>
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

        <UserProfile
          userData={userData}
          setEditedData={setEditedData}
          isEditing={isEditing}
          editedData={editedData}
          setUserData={setUserData}
          setIsSaving={setIsSaving}
          setIsEditing={setIsEditing} 
          handleEditToggle={toggleEditing}
          handleChange={handleChange}
          handleSubmit={handleProfileSubmit}
          dailyGoal={dailyGoal}
          isSaving={isSaving}
          userUid={user.uid}
        />
      </section>

      {saveError && 
      <section role="alert" aria-live="assertive" className="error-message">
          <p>{saveError}</p>
      </section>
      } 
      
      <section aria-label="Food history">
      <Historial foodHistory={foodHistory} handleAddFoodToHistory={handleAddFoodToHistory} />
    </section>
  </main>
  );
}

export default Dashboard;