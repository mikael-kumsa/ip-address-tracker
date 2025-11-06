import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [ipAddress, setIpAddress] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('ipSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ipAddress.trim()) {
      onSearch(ipAddress.trim());
      
      // Add to search history
      const newHistory = [ipAddress.trim(), ...searchHistory.filter(ip => ip !== ipAddress.trim())].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('ipSearchHistory', JSON.stringify(newHistory));
    }
  };

  const handleClear = () => {
    setIpAddress('');
  };

  const handleHistoryClick = (historyIp) => {
    setIpAddress(historyIp);
    onSearch(historyIp);
  };

  return (
    <div className="search-section">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          placeholder="Search for any IP address (e.g., 8.8.8.8)"
          className="search-input"
        />
        {ipAddress && (
          <button 
            type="button" 
            className="clear-button"
            onClick={handleClear}
          >
            ×
          </button>
        )}
        <button type="submit" className="search-button">
          &gt;
        </button>
      </form>
      
      {searchHistory.length > 0 && (
        <div className="search-history">
          <span className="history-label">Recent:</span>
          {searchHistory.map((historyIp, index) => (
            <button
              key={index}
              className="history-item"
              onClick={() => handleHistoryClick(historyIp)}
            >
              {historyIp}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;