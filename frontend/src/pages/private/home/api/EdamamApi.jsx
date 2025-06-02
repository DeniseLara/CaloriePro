import { useState } from "react";

const appId = import.meta.env.VITE_EDAMAM_APP_ID;
const apiKey = import.meta.env.VITE_EDAMAM_API_KEY;

export const useEdamamApi = () => {
  const [nutritionData, setNutritionData] = useState(null); // Mejor usar null por claridad
  const [error, setError] = useState("");
  const [searchedItems, setSearchedItems] = useState(new Set()); // Guardar alimentos buscados


  const analyzeNutrition = async (ingredients) => {
    const ingredientsArray = ingredients.split(",").map(item => item.trim()).filter(item => item);

    if (ingredientsArray.length === 0) {
      setError("Please enter at least one food.");
      return;
    }
    
    const url = `https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${apiKey}`;

  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
           "Accept": "application/json",
           "Accept-Language": "en" 
         },
        body: JSON.stringify({ ingr: ingredientsArray })
      });

      const data = await response.json();

    
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${data.message || "Solicitud rechazada"}`);
      }

      if (data.totalNutrients) {
        setNutritionData({ ...data, ingredients });
        setSearchedItems((prevItems) => {
          const updatedItems = new Set(prevItems); // Copiar el Set anterior
          updatedItems.add(ingredients); // Agregar el nuevo ingrediente
          return updatedItems; // Retornar el Set actualizado
        });
        setError("");
      } else {
        setError("Sorry, no nutritional information found.");
        setNutritionData(null); // Establecer null en lugar de un objeto vacío.
      }
    } catch (err) {
      setError("Ocurrió un error al conectar con la API.");
      setNutritionData(null); // Establecer null en lugar de un objeto vacío.
    }
  };

  return { nutritionData, error, analyzeNutrition, searchedItems };
}

