import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const CaloriesContext = createContext();

export const CaloriesProvider = ({ children }) => {
  // Estado para las calorías consumidas
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const { user } = useAuth();
  const db = getFirestore();

  // Cargar calorías desde Firestore cuando el usuario esté autenticado
  useEffect(() => {
    const fetchCalories = async () => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          const storedCalories = docSnap.data().caloriesConsumed || 0;
          setCaloriesConsumed(storedCalories);
        }
      }
    };

    fetchCalories();
  }, [user]);

  
  // Función para agregar calorías
  const addCalories = async(calories) => {
    const newCalories = caloriesConsumed + calories;
    setCaloriesConsumed(newCalories);

      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        try {
          await updateDoc(userDoc, {
          caloriesConsumed: newCalories,
        });
        } catch (error) {
      }
    }
  }  
       

  return (
    <CaloriesContext.Provider value={{ caloriesConsumed, addCalories }}>
      {children}
    </CaloriesContext.Provider>
  );
};

export const useCalories = () => {
  return useContext(CaloriesContext); 
};