import React from 'react';
import { Music, TrendingUp, Users, DollarSign } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import ModernLineChart from '../components/charts/ModernLineChart';
import ModernBarChart from '../components/charts/ModernBarChart';

// Sample data
const streamData = [
  { date: 'Jan', value: 12000 },
  { date: 'Feb', value: 19000 },
  { date: 'Mar', value: 15000 },
  { date: 'Apr', value: 25000 },
  { date: 'May', value: 22000 },
  { date: 'Jun', value: 30000 },
];

const trackData = [
  { name: 'Summer Vibes', value: 45000 },
  { name: 'Midnight Drive', value: 38000 },
  { name: 'City Lights', value: 32000 },
  { name: 'Ocean Breeze', value: 28000 },
  { name: 'Neon Dreams', value: 25000 },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-400">
          Welcome back! Here's what's happening with your music.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Music}
          label="Total Streams"
          value="1.2M"
          change="+12.5"
          trend="up"
        />
        <StatCard
          icon={Users}
          label="New Listeners"
          value="45.2K"
          change="+8.3"
          trend="up"
        />
        <StatCard
          icon={TrendingUp}
          label="Engagement Rate"
          value="64%"
          change="+3.2"
          trend="up"
        />
        <StatCard
          icon={DollarSign}
          label="Revenue"
          value="$3,420"
          change="-2.1"
          trend="down"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <h3 className="text-lg font-semibold text-gray-100 mb-4">
            Streams Over Time
          </h3>
          <ModernLineChart data={streamData} />
        </Card>
        
        <Card>
          <h3 className="text-lg font-semibold text-gray-100 mb-4">
            Top Tracks
          </h3>
          <ModernBarChart data={trackData} />
        </Card>
      </div>

      {/* Recent Activity Card */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-100 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary-900/50 flex items-center justify-center">
                <Music className="w-5 h-5 text-primary-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-100">
                  New playlist placement
                </p>
                <p className="text-xs text-gray-400">
                  2 hours ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Dashboard;

