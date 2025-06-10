import { useState } from "react";

export function useSearchHandler({ searchQuery, analyzeNutrition }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setErrorMessage("Por favor, ingresa un término de búsqueda.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      await analyzeNutrition(searchQuery);
      const currentHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
      if (!currentHistory.includes(searchQuery)) {
        currentHistory.push(searchQuery);
        localStorage.setItem("searchHistory", JSON.stringify(currentHistory));
      }
    } catch (error) {
      setErrorMessage("Hubo un problema al obtener la información nutricional. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMessage,
    handleSearch,
  };
}
