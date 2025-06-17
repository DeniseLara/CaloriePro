import { useState, useEffect } from "react";
import {
  getUserProfileFromFirestore,
  saveUserProfileToFirestore,
} from '../firebaseconfig/firebase'

import { calculateCalories } from "../utils/calculateCalories";
import { useAuth } from "../context/AuthContext";

export const useUserData = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [dailyGoal, setDailyGoal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModalUser, setShowModalUser] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    if (!user || userData !== null) return; // evita lecturas duplicadas

    const fetchUserData = async () => {
      try {
        const profileData = await getUserProfileFromFirestore(user.uid); 

          if (profileData) {
            setUserData(profileData);
            setEditedData(profileData);
          } else {
            // Si no hay perfil, reiniciamos el estado de usuario
            setUserData(null);
            setEditedData(null);
            setDailyGoal(0); // Establecemos 0 como objetivo diario si no hay perfil
          }
      } catch (error) {
        setUserData(null);
      }
      finally {
      setIsLoading(false);
    }
  };

  fetchUserData();
}, [user]); 


  useEffect(() => {
    // Este useEffect se ejecutará cuando userData cambie, asegurando que dailyGoal se actualice.
    if (userData) {
      const updatedCalories = calculateCalories(userData); // Recalcular las calorías cuando userData cambie
      setDailyGoal(updatedCalories); // Actualizar dailyGoal
    } else {
      setDailyGoal(0);
    }
  }, [userData]); // Esto hace que el dailyGoal se actualice cuando userData cambie


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
    dailyGoal,
    isLoading,
    setIsEditing,
    setEditedData,
    setUserData,
    saveUserProfile,
    showModalUser,
    closeModal,
  };
};