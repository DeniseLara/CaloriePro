import { format } from 'date-fns';

function HistorialItem({ item, index }) {
  const roundedCalories = Math.ceil(item.calories);

  return (
    <li 
      className="historial-item"
      role="listitem"
      tabIndex="0"
      aria-label={`Item ${index + 1}. Name: ${item.name}, Calories: ${item.calories}, Date: ${format(new Date(item.date), 'dd/MM/yyyy')}`}
    >
      <span>{item.name}</span>
      <span className="historial-item-calories">{roundedCalories} kcal</span>
      <span>{format(new Date(item.date), 'dd/MM/yyyy')}</span>
    </li>
  );
}

export default HistorialItem;
