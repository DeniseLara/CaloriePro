import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Timestamp } from 'firebase/firestore';

import { getFoodHistoryFromFirestore, addFoodItemToHistory } from '../firebaseconfig/firebase';
import { useNutrition } from '../context/NutritionContext'
import { useAuth } from '../context/AuthContext';

dayjs.extend(utc);
dayjs.extend(timezone);

export function useFoodHistory() {
  const { user } = useAuth()
  const [foodHistory, setFoodHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [error, setError] = useState(null);
  const [caloriesAction, setCaloriesAction] = useState(null);
  const { addCalories, updateMacros } = useNutrition();

  // Escuchar cambios en tiempo real en foodHistory
  useEffect(() => {
    const loadHistory = async () => {
    if (!user) {
      setLoadingHistory(false);
      setError(null);
      return
    }

    try {
        setLoadingHistory(true)
        setError(null);

        const history = await getFoodHistoryFromFirestore(user.uid);
        // hacemos la conversión de Timestamp a Date para cada item
        const historyWithDates = history.map(item => ({
          ...item,
          id: item.id,
          date: item.date instanceof Timestamp
            ? item.date.toDate()
            : item.date instanceof Date
            ? item.date
            : null, 
        }));

        setFoodHistory(historyWithDates); 
      } catch (error) {
        setError(new Error('Failed to load food history'));
      } finally {
        setLoadingHistory(false)
      }
    };

    loadHistory();
  }, [user]);


  const handleAdd = async (nutritionData) => {
    if (!user) {
      setError(new Error('User not authenticated'));
      return;
    }

    const foodName = nutritionData?.ingredients || "Desconocido";
    const rawCalories = nutritionData?.totalNutrients?.ENERC_KCAL?.quantity || 0;
    const calories = Math.round(rawCalories);

    const protein = nutritionData?.totalNutrients?.PROCNT?.quantity || 0;
    const fats = nutritionData?.totalNutrients?.FAT?.quantity || 0;
    const carbs = nutritionData?.totalNutrients?.CHOCDF?.quantity || 0;

    const currentDate = Timestamp.now();

    const newFoodItem = {
      name: foodName,
      calories,
      date: currentDate,
      protein,
      fats,
      carbs
    }

    try {
        setError(null);
        const result = await addFoodItemToHistory(
          user.uid, 
          newFoodItem, 
        );

        if (result.success && result.id) {
          // Actualizar estado LOCALMENTE sin refetch
          const newItemWithId = {
            id: result.id,
            ...newFoodItem,
            date: newFoodItem.date.toDate() 
          };
        
          // Agregar al inicio del array (orden descendente)
          setFoodHistory(prev => [newItemWithId, ...prev]);
        
          // Actualizar contexto de nutrición
          addCalories(calories);
          updateMacros({ protein, carbs, fats });
          setCaloriesAction("added");
        } else {
          setError(new Error('Failed to add food item'));
        }          
      } catch (error) {
        setError(new Error('Failed to add food item'));
        setCaloriesAction("error");
      }
  };

  return { 
    foodHistory, 
    caloriesAction, 
    handleAdd, 
    loadingHistory,
    error,
  };
}
