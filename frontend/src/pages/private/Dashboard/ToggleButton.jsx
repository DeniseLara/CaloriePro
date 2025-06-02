function ToggleButton({ showAll, onToggle }) {
  return (
    <button 
      className="load-more-btn" 
      onClick={onToggle}
      aria-expanded={showAll}
      aria-controls="historial-items"
    >
      {showAll ? 'Show less' : 'Load more'}
    </button>
  );
}

export default ToggleButton;
