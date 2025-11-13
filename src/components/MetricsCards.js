import React from 'react';
import './MetricsCards.css';

const MetricsCards = ({ metrics }) => {
  const metricsData = [
    {
      label: "Total Views",
      value: metrics.totalViews,
      icon: "👁️",
      color: "green"
    },
    {
      label: "Total Likes",
      value: metrics.totalLikes,
      icon: "❤️",
      color: "blue"
    },
    {
      label: "Total Comments",
      value: metrics.totalComments,
      icon: "💬",
      color: "purple"
    },
    {
      label: "Total Shares",
      value: metrics.totalShares,
      icon: "🔄",
      color: "blue-light"
    },
    {
      label: "Engagement Rate",
      value: metrics.engagementRate,
      icon: "📊",
      color: "orange"
    },
    {
      label: "Live Posts",
      value: metrics.livePosts,
      icon: "📝",
      color: "gray"
    }
  ];

  return (
    <div className="metrics-grid">
      {metricsData.map((metric, index) => (
        <div key={index} className="metric-card">
          <div className="metric-header">
            <div className={`status-dot ${metric.color}`}></div>
            <span className="metric-label">{metric.label}</span>
          </div>
          <div className="metric-value">{metric.value}</div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;

