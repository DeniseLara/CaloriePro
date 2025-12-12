import './Search.css';  
import { useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';  
import LoaderSearch from '../../ui/Loader/LoaderSearch'

function Search({ 
  searchQuery, 
  setSearchQuery, 
  isLoading, 
  errorMessage, 
  handleSearch,
}) {  
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [])

  return (
    <div className="search-container">
      <form className="search-input-container" onSubmit={handleSearch}>
        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="50g bread, 1 apple..."
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(e) }}  
          />
          <button type="submit" className="search-btn">
            <FaSearch className="search-icon" />
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="loading-container">
          <LoaderSearch/>
        </div>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Search;
