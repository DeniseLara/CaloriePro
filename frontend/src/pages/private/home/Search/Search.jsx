import { FaSearch } from 'react-icons/fa';  
import { ClipLoader } from 'react-spinners'; 
import './Search.css';  


function Search({ searchQuery, setSearchQuery, isLoading, errorMessage, handleSearch }) {  
  
  return (
    <div className="search-container">
      <form className="search-input-container" onSubmit={handleSearch}>
        <div className="input-wrapper">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter a food name (50g bread, 1 apple, 2 eggs...)"
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(e) }}  // Ejecutar búsqueda con "Enter"
          />
          <button type="submit" className="search-btn">
            <FaSearch className="search-icon" />
          </button>
        </div>
      </form>

      {/* Mostrar el spinner de loading cuando isLoading es true */}
      {isLoading && (
        <div className="loading-container">
          <ClipLoader color={"#4D7CFE"} size={50} />
        </div>
      )}

      {/* Mostramos el mensaje de error si lo hay */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Search;
