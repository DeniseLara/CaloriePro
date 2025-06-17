import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import {  getFoodHistoryFromFirestore, addFoodItemToHistory } from '../firebaseconfig/firebase';
import { useCalories } from '../context/CaloriesContext'

dayjs.extend(utc);
dayjs.extend(timezone);

export function useFoodHistory(user) {
  const [foodHistory, setFoodHistory] = useState([]);
  const [caloriesAction, setCaloriesAction] = useState(null);
  const { caloriesConsumed, addCalories } = useCalories();

const getCurrentDate = () => {
  return dayjs().tz('America/Argentina/Buenos_Aires').toISOString();
 };

// Escuchar cambios en tiempo real en foodHistory
  useEffect(() => {
    const loadHistory = async () => {
    if (!user) return;

    try {
        const history = await getFoodHistoryFromFirestore(user.uid);
        setFoodHistory(history); 
      } catch (error) {
        console.error("Error al cargar historial:", error);
      }
    };

    loadHistory();
  }, [user]);


  const handleAdd = async (nutritionData) => {
    if (!user) {
      console.error('Usuario no autenticado');
      return;
    }

    const foodName = nutritionData?.ingredients || "Desconocido";
    const rawCalories = nutritionData?.totalNutrients?.ENERC_KCAL?.quantity || 0;
    const calories = Math.round(rawCalories);
    const currentDate = getCurrentDate();
    
    const alreadyAddedToday = foodHistory.some(
      (item) => item.name === foodName && dayjs(item.date).isSame(dayjs(), 'day')
    );

    if (!alreadyAddedToday) {
      const newFoodItem = {
        name: foodName,
        calories,
        date: currentDate,
    };

    try {
        await addFoodItemToHistory(user.uid, newFoodItem, caloriesConsumed + calories);
        setCaloriesAction("added");
        addCalories(calories);

        setFoodHistory(prev => [...prev, newFoodItem]);
      } catch (error) {
        console.error("Error al agregar alimento:", error);
      }
    } else {
      setCaloriesAction("already_added");
    }
  };

  return { foodHistory, caloriesAction, handleAdd };
}
