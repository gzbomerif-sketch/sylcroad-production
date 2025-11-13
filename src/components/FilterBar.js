import React from 'react';
import './FilterBar.css';

const FilterBar = ({ timeRange, setTimeRange, platform, setPlatform, creator, setCreator }) => {
  const timeRanges = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'All Time'];
  const platforms = ['All Platforms', 'Instagram', 'Twitter', 'TikTok', 'YouTube'];
  const creators = ['All Creators', 'Creator 1', 'Creator 2', 'Creator 3', 'Creator 4'];

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <select
          className="filter-select"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          {timeRanges.map(range => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <select
          className="filter-select"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          {platforms.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <select
          className="filter-select"
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
        >
          {creators.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;

