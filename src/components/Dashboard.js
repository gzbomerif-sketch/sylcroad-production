import React, { useState } from 'react';
import Header from './Header';
import MetricsCards from './MetricsCards';
import PerformanceChart from './PerformanceChart';
import FilterBar from './FilterBar';
import PostsGrid from './PostsGrid';
import './Dashboard.css';

const Dashboard = () => {
  console.log('📊 Dashboard component rendering...');
  const [timeRange, setTimeRange] = useState('Last 7 Days');
  const [platform, setPlatform] = useState('All Platforms');
  const [creator, setCreator] = useState('All Creators');

  // Mock data - replace with real API calls
  const campaignData = {
    name: "Sylcroad Master Tracker",
    campaignCount: 2,
    createdDate: "Aug 16th, 2025",
    totalBudget: "USD $150,000.00"
  };

  const metrics = {
    totalViews: "256,664,919",
    totalLikes: "5,144,610",
    totalComments: "62,307",
    totalShares: "1,045,600",
    engagementRate: "2.44%",
    livePosts: "2,297"
  };

  return (
    <div className="dashboard">
      <Header />
      
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1 className="dashboard-title">{campaignData.name}</h1>
          <div className="dashboard-meta">
            <span>{campaignData.campaignCount} Campaigns</span>
            <span>Created {campaignData.createdDate}</span>
            <span>Total Budget: {campaignData.totalBudget}</span>
          </div>
        </div>

        <section className="analytics-section">
          <h2 className="section-title">Live Post Analytics</h2>
          
          <FilterBar
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            platform={platform}
            setPlatform={setPlatform}
            creator={creator}
            setCreator={setCreator}
          />

          <MetricsCards metrics={metrics} />

          <PerformanceChart />
        </section>

        <section className="posts-section">
          <div className="posts-header">
            <div className="posts-tabs">
              <button className="posts-tab">
                Campaigns <span className="tab-count">2</span>
              </button>
              <button className="posts-tab active">
                Live Posts <span className="tab-count">9+</span>
              </button>
            </div>
          </div>

          <PostsGrid />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

