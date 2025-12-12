import { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const NutritionContext = createContext();

export function NutritionProvider({ children }) {
  // Estado para las calorías consumidas
  const { user } = useAuth();
  const db = getFirestore();

  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [macros, setMacros] = useState({
    protein: 0,
    carbs: 0,
    fats: 0,
  })

  // Cargar calorías y macros desde Firestore cuando el usuario esté autenticado
  useEffect(() => {
    const loadNutrition = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();

        setCaloriesConsumed(data.caloriesConsumed || 0);
        setMacros({
          protein: data.protein || 0,
          carbs: data.carbs || 0,
          fats: data.fats || 0,
        });
      }
    };

    loadNutrition();
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
  
  // Guardar macros
  const updateMacros = async (newMacros) => {
    setMacros(newMacros);

    if (user) {
      await updateDoc(doc(db, "users", user.uid), {
        protein: newMacros.protein,
        carbs: newMacros.carbs,
        fats: newMacros.fats,
      });
    }
  };
       

  return (
    <NutritionContext.Provider 
    value={{ 
      caloriesConsumed, 
      addCalories,
      macros,
      updateMacros 
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = () => {
  return useContext(NutritionContext); 
};