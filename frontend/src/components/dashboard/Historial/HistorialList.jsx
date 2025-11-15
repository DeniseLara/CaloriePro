import HistorialItem from './HistorialItem';

function HistorialList({ foodHistory, visibleItems }) {
  return (
    <ul className="historial-list-item" role="list" id="historial-items">
      {foodHistory.slice(0, visibleItems).map((item, index) => (
        <HistorialItem key={index} item={item} index={index} />
      ))}
    </ul>
  );
}

export default HistorialList;
