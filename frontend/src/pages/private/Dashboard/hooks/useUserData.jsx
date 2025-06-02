import { useState, useEffect } from "react";
import {
  auth,
  getUserProfileFromFirestore,
  saveUserProfileToFirestore,
  getFoodHistoryFromFirestore,
  saveFoodHistoryToFirestore,
} from '../../../../firebaseconfig/firebase'

import { useCalories } from "../../context/CaloriesContext";

export const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [foodHistory, setFoodHistory] = useState([]); // El historial de alimentos
  const [dailyGoal, setDailyGoal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModalUser, setShowModalUser] = useState(false); // Estado para controlar el modal

  const { addCalories } = useCalories(); // Accedemos al contexto de calorías

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser; // Obtén el usuario autenticado

        if (user) {
          const profileData = await getUserProfileFromFirestore(user.uid); // Asegúrate de pasar el uid

          if (profileData) {
            setUserData(profileData);
            setEditedData(profileData);

            // Obtener el historial de alimentos
            const foodHistoryData = await getFoodHistoryFromFirestore(user.uid); // Función para obtener el historial
            setFoodHistory(foodHistoryData || []); // Si no hay historial, inicializa como un array vacío

            const calculatedCalories = calculateCalories(profileData);
            setDailyGoal(calculatedCalories);
          } else {
            // Si no hay perfil, reiniciamos el estado de usuario
            setUserData(null);
            setEditedData(null);
            setDailyGoal(0); // Establecemos 0 como objetivo diario si no hay perfil
            setFoodHistory([]); // Sin historial de alimentos si no hay perfil
          }
        } else {
          console.error("No se encuentra un usuario autenticado.");
        }
      } catch (error) {
        setUserData(null);
        setFoodHistory([]); // Aseguramos que no haya datos en caso de error
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Este useEffect se ejecutará cuando userData cambie, asegurando que dailyGoal se actualice.
    if (userData) {
      const updatedCalories = calculateCalories(userData); // Recalcular las calorías cuando userData cambie
      setDailyGoal(updatedCalories); // Actualizar dailyGoal
    }
  }, [userData]); // Esto hace que el dailyGoal se actualice cuando userData cambie

  // Calcular las calorías basadas en el perfil del usuario
  const calculateCalories = (profileData) => {
    if (!profileData || !profileData.age || !profileData.weight || !profileData.height || !profileData.activityLevel || !profileData.goal) {
      console.error("Faltan datos necesarios para calcular las calorías");
      return 0;
    }

    const { age, weight, height, activityLevel, goal, calorieAdjustment } = profileData;

    let bmr = 10 * weight + 6.25 * height - 5 * age + (profileData.gender === "male" ? 5 : -161);

    const activityMultiplier = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      intense: 1.725,
      veryIntense: 1.9,
    };

    bmr *= activityMultiplier[activityLevel];

    if (goal === "lose") {
      const deficit = calorieAdjustment ? parseInt(calorieAdjustment) : 0;
      bmr -= deficit;
    } else if (goal === "gain") {
      const surplus = calorieAdjustment ? parseInt(calorieAdjustment) : 0;
      bmr += surplus;
    }

    return Math.floor(bmr * 100) / 100;
  };

  // Función para agregar alimentos al historial
  const handleAddFoodToHistory = async (food) => {
    try {
      // Agregar el nuevo alimento al historial de alimentos
      const updatedFoodHistory = [...foodHistory, food];
      setFoodHistory(updatedFoodHistory); // Actualiza el historial de alimentos localmente
      await saveFoodHistoryToFirestore(updatedFoodHistory); // Guarda el historial actualizado en Firestore

      // Calcular las calorías totales después de agregar el nuevo alimento
      const totalCalories = food.calories;

      // Actualizar el estado de las calorías consumidas con el nuevo total
      addCalories(totalCalories); // Delegamos la actualización de calorías al contexto
    } catch (error) {
      console.error("Error al agregar alimento al historial:", error);
    }
  };

  // Función para guardar el perfil
  const saveUserProfile = async (updatedProfileData) => {
    try {
      await saveUserProfileToFirestore(updatedProfileData);
      setUserData(updatedProfileData); // Guardamos los datos del perfil localmente
      setEditedData(updatedProfileData); // Actualizamos los datos editados también
      const calculatedCalories = calculateCalories(updatedProfileData);
      setDailyGoal(calculatedCalories); // Recalculamos el objetivo diario

      // Mostrar el modal de éxito
      setShowModalUser(true); // Activar el modal
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
    }
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModalUser(false);
  };

  return {
    userData,
    isEditing,
    editedData,
    foodHistory,
    dailyGoal,
    isLoading,
    setIsEditing,
    setEditedData,
    setUserData,
    saveUserProfile,
    showModalUser,
    closeModal,
    handleAddFoodToHistory,
  };
};