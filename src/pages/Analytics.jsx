import React from 'react';
import { BarChart3 } from 'lucide-react';
import Card from '../components/ui/Card';

const Analytics = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-100 mb-2">
        Analytics
      </h1>
      <p className="text-gray-400 mb-8">
        Deep dive into your campaign performance
      </p>

      <Card className="text-center py-12">
        <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-100 mb-2">
          Analytics Coming Soon
        </h3>
        <p className="text-gray-400">
          Advanced analytics and reporting features are under development
        </p>
      </Card>
    </div>
  );
};

export default Analytics;

