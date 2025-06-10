import { useState, useEffect } from 'react';
import { db, doc, getDoc, updateDoc } from '../firebaseconfig/firebase'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function useFoodHistory(user, caloriesConsumed, addCalories, nutritionData) {
  const [foodHistory, setFoodHistory] = useState([]);
  const [caloriesAction, setCaloriesAction] = useState(null);

const getCurrentDate = () => {
  // Reemplazá "America/Argentina/Buenos_Aires" por tu zona si es otra
  return dayjs().tz('America/Argentina/Buenos_Aires').toISOString();
 };

  const loadFoodHistory = async () => {
    if (user) {
      const foodHistoryRef = doc(db, 'users', user.uid);
      const docSnapshot = await getDoc(foodHistoryRef);
      if (docSnapshot.exists()) {
        setFoodHistory(docSnapshot.data().foodHistory || []);
      }
    }
  };

  useEffect(() => {
    if (user) loadFoodHistory();
  }, [user]);

  useEffect(() => {
    if (nutritionData) {
      const foodName = nutritionData?.ingredients || "Desconocido";
      if (foodHistory.some(item => item.name === foodName)) {
        setCaloriesAction("added");
      } else {
        setCaloriesAction(null);
      }
    }
  }, [nutritionData, foodHistory]);

  const handleAdd = async () => {
    if (!user) {
      console.error('Usuario no autenticado');
      return;
    }

    const foodName = nutritionData?.ingredients || "Desconocido";
    const rawCalories = nutritionData?.totalNutrients?.ENERC_KCAL?.quantity || 0;
    const calories = Math.round(rawCalories);
    const currentDate = getCurrentDate();

    if (!foodHistory.some(item => item.name === foodName)) {
      const newFood = { name: foodName, calories, date: currentDate };
      const updatedFoodHistory = [...foodHistory, newFood];
      const foodHistoryRef = doc(db, 'users', user.uid);
      await updateDoc(foodHistoryRef, {
        foodHistory: updatedFoodHistory,
        caloriesConsumed: caloriesConsumed + calories,
      });
      setFoodHistory(updatedFoodHistory);
      setCaloriesAction("added");
      addCalories(calories);
    } else {
      setCaloriesAction("already_added");
    }
  };

  return { foodHistory, caloriesAction, handleAdd };
}
