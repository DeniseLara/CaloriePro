import { format, isValid } from 'date-fns';

function HistorialItem({ item, index }) {
  const roundedCalories = Math.round(item.calories);
  let formattedDate = 'Fecha no disponible';
  if (item.date instanceof Date && isValid(item.date)) {
    formattedDate = format(item.date, 'dd/MM/yyyy');
  }
  
  return (
    <li 
      className="historial-item"
      role="listitem"
      tabIndex="0"
      aria-label={`Item ${index + 1}. Name: ${item.name}, Calories: ${roundedCalories}, Date: ${formattedDate}`}
    >
      <span className="historial-item-name">{item.name}</span>
      <span className="historial-item-calories">{roundedCalories} kcal</span>
      <span className="historial-item-date">{formattedDate}</span>
    </li>
  );
}

export default HistorialItem;
