import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const ModernLineChart = ({ data, dataKey = 'value', showArea = true }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-gray-400 text-sm mb-1">{payload[0].payload.date}</p>
          <p className="text-gray-100 font-semibold">
            {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6c63ff" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#6c63ff" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
        <XAxis 
          dataKey="date" 
          stroke="#6e7681"
          style={{ fontSize: '12px' }}
          tickLine={false}
        />
        <YAxis 
          stroke="#6e7681"
          style={{ fontSize: '12px' }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        {showArea && (
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#6c63ff"
            fill="url(#colorGradient)"
            strokeWidth={2}
          />
        )}
        <Line 
          type="monotone" 
          dataKey={dataKey} 
          stroke="#6c63ff" 
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: '#6c63ff', strokeWidth: 2, stroke: '#0d1117' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ModernLineChart;

