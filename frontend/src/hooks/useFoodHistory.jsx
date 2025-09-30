import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Timestamp } from 'firebase/firestore';

import { getFoodHistoryFromFirestore, addFoodItemToHistory } from '../firebaseconfig/firebase';
import { useCalories } from '../context/CaloriesContext'

dayjs.extend(utc);
dayjs.extend(timezone);

export function useFoodHistory(user) {
  const [foodHistory, setFoodHistory] = useState([]);
  const [caloriesAction, setCaloriesAction] = useState(null);
  const { caloriesConsumed, addCalories } = useCalories();

  // Escuchar cambios en tiempo real en foodHistory
  useEffect(() => {
    const loadHistory = async () => {
    if (!user) return;

    try {
        const history = await getFoodHistoryFromFirestore(user.uid);
        // hacemos la conversión de Timestamp a Date para cada item
        const historyWithDates = history.map(item => ({
          ...item,
          date: item.date instanceof Timestamp
            ? item.date.toDate()
            : item.date instanceof Date
            ? item.date
            : null, 
        }));

        setFoodHistory(historyWithDates); 
      } catch (error) {
      }
    };

    loadHistory();
  }, [user]);


  const handleAdd = async (nutritionData) => {
    if (!user) {
      return;
    }

    const foodName = nutritionData?.ingredients || "Desconocido";
    const rawCalories = nutritionData?.totalNutrients?.ENERC_KCAL?.quantity || 0;
    const calories = Math.round(rawCalories);
    const currentDate = Timestamp.now();
    
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
        const updatedHistoryRaw = await getFoodHistoryFromFirestore(user.uid);
        // Aplicar conversión al actualizar el estado también
        const updatedHistory = updatedHistoryRaw.map(item => ({
          ...item,
          date: item.date instanceof Timestamp ? item.date.toDate() : item.date,
        }));
        
        setFoodHistory(updatedHistory);      
      } catch (error) {
      }
    } else {
      setCaloriesAction("already_added");
    }
  };

  return { foodHistory, caloriesAction, handleAdd };
}
