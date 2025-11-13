import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import Button from '../ui/Button';

const TopBar = () => {
  return (
    <header className="sticky top-0 z-30 h-16 px-6 flex items-center justify-between bg-gray-800/80 backdrop-blur-md border-b border-gray-700">
      {/* Search */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns, tracks..."
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-gray-100 transition-colors rounded-lg hover:bg-gray-700">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
        </button>

        {/* Quick Actions */}
        <Button icon={Plus}>
          New Campaign
        </Button>
      </div>
    </header>
  );
};

export default TopBar;

