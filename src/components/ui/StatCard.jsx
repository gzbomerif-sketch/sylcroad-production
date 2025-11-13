import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from './Card';

const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  change, 
  trend 
}) => {
  const isPositive = trend === 'up';
  
  return (
    <Card hover>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-primary-900/50 rounded-lg">
          <Icon className="w-6 h-6 text-primary-500" />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? 'text-success' : 'text-error'
          }`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {change}%
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-100">{value}</p>
      </div>
    </Card>
  );
};

export default StatCard;

