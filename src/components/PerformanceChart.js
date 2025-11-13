import React from 'react';
import { Settings } from 'lucide-react';
import './PerformanceChart.css';

const PerformanceChart = () => {
  // Mock chart data
  const dates = ['Nov 6', 'Nov 7', 'Nov 8', 'Nov 9', 'Nov 10', 'Nov 11', 'Nov 12', 'Nov 13', 'Nov 14'];
  
  return (
    <div className="chart-container">
      <div className="chart-header">
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-dot green"></div>
            <span>259M Views</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot purple"></div>
            <span>62k Comments</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot blue"></div>
            <span>5.1M Likes</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot orange"></div>
            <span>2.44% Engagement</span>
          </div>
        </div>
        <button className="metrics-toggle"><Settings size={16} style={{marginRight: '4px'}} /> Metrics</button>
      </div>
      
      <div className="chart-content">
        <svg className="chart-svg" viewBox="0 0 800 300" preserveAspectRatio="none">
          {/* Background grid */}
          <g className="grid">
            <line x1="0" y1="50" x2="800" y2="50" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4"/>
            <line x1="0" y1="100" x2="800" y2="100" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4"/>
            <line x1="0" y1="150" x2="800" y2="150" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4"/>
            <line x1="0" y1="200" x2="800" y2="200" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4"/>
            <line x1="0" y1="250" x2="800" y2="250" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4"/>
          </g>

          {/* Green line (Views) */}
          <path
            d="M 0,280 L 100,250 L 200,200 L 300,150 L 400,120 L 500,100 L 600,80 L 700,60 L 800,50"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            className="chart-line"
          />
          
          {/* Purple line (Engagement) */}
          <path
            d="M 0,270 L 100,240 L 200,210 L 300,180 L 400,160 L 500,145 L 600,130 L 700,115 L 800,100"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="3"
            className="chart-line"
          />
          
          {/* Blue line (Likes) */}
          <path
            d="M 0,260 L 100,235 L 200,215 L 300,195 L 400,180 L 500,170 L 600,160 L 700,150 L 800,145"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            className="chart-line"
          />
          
          {/* Orange line (Campaign 2) */}
          <path
            d="M 0,250 L 100,240 L 200,235 L 300,230 L 400,210 L 500,180 L 600,150 L 700,130 L 800,120"
            fill="none"
            stroke="#f97316"
            strokeWidth="3"
            className="chart-line"
          />
        </svg>

        <div className="chart-x-axis">
          {dates.map((date, i) => (
            <span key={i} className="x-axis-label">{date}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;

