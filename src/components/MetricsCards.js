import React from 'react';
import { Eye, Heart, MessageCircle, Share2, BarChart3, Smartphone } from 'lucide-react';
import './MetricsCards.css';

const iconMap = {
  'eye': Eye,
  'heart': Heart,
  'message': MessageCircle,
  'share': Share2,
  'chart': BarChart3,
  'phone': Smartphone
};

const MetricsCards = () => {
  const metrics = [
    {
      id: 1,
      title: 'Total Views',
      value: '256,664,919',
      iconName: 'eye',
      color: 'green',
      trend: '+12.5%'
    },
    {
      id: 2,
      title: 'Total Likes',
      value: '5,144,610',
      iconName: 'heart',
      color: 'blue',
      trend: '+8.2%'
    },
    {
      id: 3,
      title: 'Total Comments',
      value: '62,307',
      iconName: 'message',
      color: 'purple',
      trend: '+5.7%'
    },
    {
      id: 4,
      title: 'Total Shares',
      value: '1,045,600',
      iconName: 'share',
      color: 'blue',
      trend: '+15.3%'
    },
    {
      id: 5,
      title: 'Engagement Rate',
      value: '2.44%',
      iconName: 'chart',
      color: 'yellow',
      trend: '+0.3%'
    },
    {
      id: 6,
      title: 'Live Posts',
      value: '2,297',
      iconName: 'phone',
      color: 'purple',
      trend: '+45'
    }
  ];

  return (
    <div className="metrics-grid">
      {metrics.map(metric => {
        const IconComponent = iconMap[metric.iconName];
        return (
          <div key={metric.id} className={`metric-card ${metric.color}`}>
            <div className="metric-header">
              <div className="metric-title">
                <span className="metric-icon">
                  <IconComponent size={20} />
                </span>
                <span>{metric.title}</span>
              </div>
              <div className={`metric-indicator ${metric.color}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="currentColor"/>
                  <path d="M6 10L9 13L14 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="metric-value">{metric.value}</div>
            <div className="metric-trend">{metric.trend} from last period</div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsCards;
