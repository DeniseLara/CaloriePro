import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../../context/authContext';

// Creamos un contexto
const CaloriesContext = createContext();

// Componente que proporciona el contexto de calorías a toda la aplicación
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
  const addCalories = async (calories) => {
    const roundedCalories = Math.round(calories); 
    setCaloriesConsumed((prev) => {
      const newCalories = prev + roundedCalories;

     if (user) {
      const userDoc = doc(db, 'users', user.uid);
      updateDoc(userDoc, {
        caloriesConsumed: newCalories,
      });
    }

    return newCalories;
  });
};


  // Exportamos el contexto con los valores necesarios
  return (
    <CaloriesContext.Provider value={{ caloriesConsumed, addCalories }}>
      {children}
    </CaloriesContext.Provider>
  );
};

CaloriesProvider.propTypes = {
  children: PropTypes.node.isRequired, // Aseguramos que 'children' sea un nodo válido
};

// Hook personalizado para acceder al contexto
export const useCalories = () => {
  return useContext(CaloriesContext); // Aquí accedemos al contexto de calorías
};