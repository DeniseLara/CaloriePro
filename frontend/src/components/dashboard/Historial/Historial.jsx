import './Historial.css';
import { useState } from 'react';

import Loader from '../../ui/Loader/Loader';
import HistorialList from './HistorialList';
import ToggleButton from '../../ui/Button/ToggleButton'


function Historial({ foodHistory = [], loading = false, error = null }) {
  const [visibleItems, setVisibleItems] = useState(5); 
  const [showAll, setShowAll] = useState(false);
  
  if (error) {
    return <p>Error al cargar el historial de alimentos: {error.message}</p>;
  }

  const handleToggle = () => {
    if (showAll) {
      setVisibleItems(5); // Vuelve a mostrar solo los primeros 5 elementos
    } else {
      setVisibleItems(foodHistory.length); 
    }
    setShowAll(!showAll); 
  };
  

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
        <p className="historial-message" role="status">
          You don't have any food history for today.
        </p>
      )}
    </section>
  );
}


export default Historial;
