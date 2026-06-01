// src\pages\dashboard\Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import StatsCard from '../../components/common/StatsCard';
import LoanSummary from './LoanSummary';
import ActivityFeed from './ActivityFeed';
import QuickActions from './QuickActions';
import { useApi } from '../../hooks/useApi';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    activeLoans: 0,
    totalBorrowed: 0,
    nextPayment: null,
    creditScore: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const { get } = useApi();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, activityData] = await Promise.all([
        get('/user/dashboard/stats'),
        get('/user/dashboard/activity')
      ]);
      setStats(statsData);
      setRecentActivity(activityData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user?.fullName?.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your loans today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Active Loans"
          value={stats.activeLoans}
          icon="📊"
          color="blue"
        />
        <StatsCard
          title="Total Borrowed"
          value={`₹${stats.totalBorrowed.toLocaleString()}`}
          icon="💰"
          color="green"
        />
        <StatsCard
          title="Next Payment"
          value={stats.nextPayment || 'No pending'}
          icon="📅"
          color="orange"
        />
        <StatsCard
          title="Credit Score"
          value={stats.creditScore || 'N/A'}
          icon="📈"
          color="purple"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LoanSummary />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <ActivityFeed activities={recentActivity} />
      </div>
    </div>
  );
};

export default Dashboard;