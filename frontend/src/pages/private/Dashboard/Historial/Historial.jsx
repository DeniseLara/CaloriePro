import './Historial.css';
import { useUserData } from '../hooks/useUserData';
import { useState } from 'react';
import { useAuth } from '../../../../context/authContext';

import Loader from '../components/Loader';
import HistorialList from './HistorialList';
import ToggleButton from '../ToggleButton';


function Historial() {
  const { isAuthenticated } = useAuth();
  // Llamar al hook useUserData para obtener los datos del usuario, incluido el historial de alimentos
  const { userData, loading, error } = useUserData(); 
  const [visibleItems, setVisibleItems] = useState(5); // Inicialmente se mostrarán 5 elementos
  const [showAll, setShowAll] = useState(false); // Estado para controlar si mostrar todos los elementos


  if (!isAuthenticated) {
    return <p>No estás autenticado. Por favor, inicia sesión.</p>;
  }
  
  if (error) {
    return <p>Error al cargar el historial de alimentos: {error.message}</p>;
  }

  const handleToggle = () => {
    if (showAll) {
      setVisibleItems(5); // Vuelve a mostrar solo los primeros 5 elementos
    } else {
      setVisibleItems(foodHistory.length); // Muestra todos los elementos
    }
    setShowAll(!showAll); // Cambia el estado de mostrar todo a mostrar menos
  };

  // Asegurarse de que el historial de alimentos esté presente
  const foodHistory = userData?.foodHistory || [];


  return (
    <section className="historial-container" aria-labelledby="history-title">
      <h2 className="historial-title" id="history-title">Added calories history</h2>
      <ul className="historial-subtitle" aria-hidden="true">
        <li className="historial-name">Name</li>
        <li className="historial-calories">Calories</li>
        <li className="historial-date">Date</li>
      </ul>

      {loading ? (
        <Loader/>
      ) : foodHistory.length > 0 ? (
        <>
           <HistorialList foodHistory={foodHistory} visibleItems={visibleItems} />
          {(foodHistory.length > visibleItems || showAll) && (
            <ToggleButton showAll={showAll} onToggle={handleToggle} />
            )}
          </>
      ) : (
        <p className="historial-message" role="status">You don't have any food history for today.</p>
      )}
    </section>
  );
}


export default Historial;
