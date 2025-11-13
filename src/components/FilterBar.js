import React, { useState, useRef, useEffect } from 'react';
import './FilterBar.css';

const FilterBar = ({ timeRange, setTimeRange, platform, setPlatform, creator, setCreator }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handlePlatformToggle = (platformName) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformName) 
        ? prev.filter(p => p !== platformName)
        : [...prev, platformName]
    );
  };

  const applyPlatformFilter = () => {
    setPlatform(selectedPlatforms.length === 0 ? 'All Platforms' : selectedPlatforms.join(', '));
    setOpenDropdown(null);
  };

  const clearPlatformFilter = () => {
    setSelectedPlatforms([]);
    setPlatform('All Platforms');
  };

  return (
    <div className="filter-bar" ref={dropdownRef}>
      {/* Time Range Dropdown */}
      <div className="filter-dropdown">
        <button 
          className={`filter-button ${openDropdown === 'time' ? 'active' : ''}`}
          onClick={() => toggleDropdown('time')}
        >
          <span className="filter-icon">📅</span>
          <span className="filter-label">{timeRange}</span>
          <span className="dropdown-arrow">▼</span>
        </button>
        {openDropdown === 'time' && (
          <div className="dropdown-menu">
            <div className="dropdown-option" onClick={() => { setTimeRange('Last 7 Days'); setOpenDropdown(null); }}>
              Last 7 Days
            </div>
            <div className="dropdown-option" onClick={() => { setTimeRange('Last 30 Days'); setOpenDropdown(null); }}>
              Last 30 Days
            </div>
            <div className="dropdown-option" onClick={() => { setTimeRange('Last 90 Days'); setOpenDropdown(null); }}>
              Last 90 Days
            </div>
            <div className="dropdown-option" onClick={() => { setTimeRange('All Time'); setOpenDropdown(null); }}>
              All Time
            </div>
          </div>
        )}
      </div>

      {/* Platform Dropdown with Checkboxes */}
      <div className="filter-dropdown">
        <button 
          className={`filter-button ${openDropdown === 'platform' ? 'active' : ''}`}
          onClick={() => toggleDropdown('platform')}
        >
          <span className="filter-label">
            {selectedPlatforms.length === 0 ? 'All Platforms' : `${selectedPlatforms.length} Platform${selectedPlatforms.length > 1 ? 's' : ''}`}
          </span>
          <span className="dropdown-arrow">▼</span>
        </button>
        {openDropdown === 'platform' && (
          <div className="dropdown-menu checkbox-menu">
            <label className="checkbox-option">
              <input 
                type="checkbox" 
                checked={selectedPlatforms.includes('TikTok')}
                onChange={() => handlePlatformToggle('TikTok')}
              />
              <span className="platform-icon">🎵</span>
              <span>TikTok</span>
            </label>
            <label className="checkbox-option">
              <input 
                type="checkbox" 
                checked={selectedPlatforms.includes('Instagram')}
                onChange={() => handlePlatformToggle('Instagram')}
              />
              <span className="platform-icon">📷</span>
              <span>Instagram</span>
            </label>
            <div className="dropdown-actions">
              <button className="btn-clear" onClick={clearPlatformFilter}>Clear</button>
              <button className="btn-apply" onClick={applyPlatformFilter}>Apply</button>
            </div>
          </div>
        )}
      </div>

      {/* Creators Dropdown */}
      <div className="filter-dropdown">
        <button 
          className={`filter-button ${openDropdown === 'creator' ? 'active' : ''}`}
          onClick={() => toggleDropdown('creator')}
        >
          <span className="filter-label">{creator}</span>
          <span className="dropdown-arrow">▼</span>
        </button>
        {openDropdown === 'creator' && (
          <div className="dropdown-menu">
            <div className="dropdown-option" onClick={() => { setCreator('All Creators'); setOpenDropdown(null); }}>
              All Creators
            </div>
            <div className="dropdown-option" onClick={() => { setCreator('Creator 1'); setOpenDropdown(null); }}>
              Creator 1
            </div>
            <div className="dropdown-option" onClick={() => { setCreator('Creator 2'); setOpenDropdown(null); }}>
              Creator 2
            </div>
            <div className="dropdown-option" onClick={() => { setCreator('Creator 3'); setOpenDropdown(null); }}>
              Creator 3
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
