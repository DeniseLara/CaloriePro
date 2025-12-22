import { useState, useEffect, useCallback } from "react";
import {
  getUserProfileFromFirestore,
  saveUserProfileToFirestore,
} from '../firebaseconfig/firebase'
import { calculateCalories } from "../utils/calculateCalories";
import { useAuth } from "../context/AuthContext";

export function useUserData() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [dailyGoal, setDailyGoal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModalUser, setShowModalUser] = useState(false); 
  const [saveError, setSaveError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user || userData !== null) return; // evita lecturas duplicadas

    const fetchUserData = async () => {
      try {
        const profileData = await getUserProfileFromFirestore(user.uid); 
          if (profileData) {
            setUserData(profileData);
            setEditedData(profileData);
          } else {
            // Si no hay perfil, reiniciar el estado de usuario
            setUserData(null);
            setEditedData(null);
            setDailyGoal(0); // Establecer 0 como objetivo diario si no hay perfil
          }
      } catch (error) {
        setUserData(null);
      } finally {
      setIsLoading(false);
    }
  };

    fetchUserData();
  }, [user, userData]); 

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
  const saveUserProfile = async (data) => {
    setIsSaving(true);
    setSaveError(null);

    try {
      await saveUserProfileToFirestore(data);
      setUserData(data); // Guardamos los datos del perfil localmente
      setEditedData(data); // Actualizamos los datos editados también
      setDailyGoal(calculateCalories(data)); // Recalculamos el objetivo diario
      setShowModalUser(true); 
      setSaveError(null);
      setIsEditing(false);
    } catch (error) {
      setSaveError("Error al guardar perfil. Intenta nuevamente")
    } finally {
      setIsSaving(false);
    }
  };

  // toggle modo edición
  const toggleEditing = useCallback(() => {
    if (!isEditing && userData) {
      setEditedData(userData);
    }
    setIsEditing(prev => !prev);
  }, [isEditing, userData]);

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
    toggleEditing,
    saveError,
    isSaving,
    setSaveError,
  };
};