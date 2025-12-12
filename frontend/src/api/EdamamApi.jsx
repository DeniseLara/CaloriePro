import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const appId = import.meta.env.VITE_EDAMAM_APP_ID;
const apiKey = import.meta.env.VITE_EDAMAM_API_KEY;

export const useEdamamApi = () => {
  const { user } = useAuth();
  const userKey = user?.uid || "guest";

  const [nutritionData, setNutritionData] = useState(null);
  const [error, setError] = useState("");
  const [searchedItems, setSearchedItems] = useState(new Set()); 
  // Inicializar caché desde localStorage
  const [cache, setCache] = useState(() => {
    const saved = localStorage.getItem(`foodCache-${userKey}`);
    return saved ? JSON.parse(saved) : {};
  });


  useEffect(() => {
    // Guardar alimento en localstorage
    localStorage.setItem(`foodCache-${userKey}`, JSON.stringify(cache));

  }, [cache, userKey]);

  const analyzeNutrition = async (ingredient) => {
    const query = ingredient.trim();
    if (!query) {
      setError("Please enter at least one food.");
      return;
    }

    // Revisar si ya tenemos los datos en caché
    if (cache[query]) {
      setNutritionData(cache[query]);
      setSearchedItems((prev) => new Set(prev).add(query));
      setError("");
      return;
    }

    try {
      const parserUrl = `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${apiKey}&ingr=${encodeURIComponent(query)}`;
      const res = await fetch(parserUrl);
      const data = await res.json();

      if (!data.parsed?.length) {
        setError("No se encontró el alimento");
        setNutritionData(null);
        return;
      }

      const food = data.parsed[0].food;

      // Guardar solo lo que necesitamos
      const newData = ({
        totalNutrients: {
          ENERC_KCAL: { quantity: food.nutrients.ENERC_KCAL || 0 },
          PROCNT: { quantity: food.nutrients.PROCNT || 0 },
          FAT: { quantity: food.nutrients.FAT || 0 },
          CHOCDF: { quantity: food.nutrients.CHOCDF || 0 },
        },
        ingredients: food.label,
      });

      setCache((prev) => ({ ...prev, [query]: newData }));
      setNutritionData(newData);
      setSearchedItems((prev) => new Set(prev).add(query));
      setError("");
      
    } catch (err) {
      setError("Ocurrió un error al conectar con la API.");
      setNutritionData(null);
    }
  };

  return { nutritionData, error, analyzeNutrition, searchedItems };
};