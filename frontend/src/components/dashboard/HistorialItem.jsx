import { format } from 'date-fns';

function HistorialItem({ item, index }) {
  const roundedCalories = Math.round(item.calories);
  const formattedDate = format(item.date, 'dd/MM/yyyy');

  return (
    <li 
      className="historial-item"
      role="listitem"
      tabIndex="0"
      aria-label={`Item ${index + 1}. Name: ${item.name}, Calories: ${roundedCalories}, Date: ${formattedDate}`}
    >
      <span>{item.name}</span>
      <span className="historial-item-calories">{roundedCalories} kcal</span>
      <span>{formattedDate}</span>
    </li>
  );
}

export default HistorialItem;
