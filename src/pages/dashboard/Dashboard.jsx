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
  <div className="min-h-screen bg-slate-50 p-6">
    {/* Welcome Banner */}
    <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome back, {user?.fullName?.split(" ")[0]} 👋
          </h1>

          <p className="text-lg text-gray-600 max-w-xl">
            Access your loans, track applications, and manage repayments
            securely from one place.
          </p>

          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 bg-blue-700 text-white rounded-xl font-medium hover:bg-blue-800">
              Apply Loan
            </button>

            <button className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50">
              View Applications
            </button>
          </div>
        </div>

        <div className="w-full lg:w-96">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2721/2721152.png"
            alt="Loan Banner"
            className="w-full max-w-sm mx-auto"
          />
        </div>
      </div>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Active Loans"
        value={stats.activeLoans}
        icon="📊"
        color="blue"
      />

      <StatsCard
        title="Total Borrowed"
        value={`₹${stats.totalBorrowed?.toLocaleString() || 0}`}
        icon="💰"
        color="green"
      />

      <StatsCard
        title="Next Payment"
        value={stats.nextPayment || "No Pending"}
        icon="📅"
        color="orange"
      />

      <StatsCard
        title="Credit Score"
        value={stats.creditScore || "N/A"}
        icon="📈"
        color="purple"
      />
    </div>

    {/* Feature Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl mb-4">
          ⚡
        </div>
        <h3 className="text-xl font-semibold mb-2">
          Easy Application
        </h3>
        <p className="text-gray-600">
          Complete your loan application in just a few minutes.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl mb-4">
          📄
        </div>
        <h3 className="text-xl font-semibold mb-2">
          Paperless Process
        </h3>
        <p className="text-gray-600">
          Upload documents digitally and track status online.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl mb-4">
          🛡️
        </div>
        <h3 className="text-xl font-semibold mb-2">
          Quick Verification
        </h3>
        <p className="text-gray-600">
          Fast approval and verification powered by secure technology.
        </p>
      </div>
    </div>

    {/* Main Content */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <LoanSummary />
      </div>

      <div>
        <QuickActions />
      </div>
    </div>

    {/* Activity Feed */}
    <div className="mt-8">
      <ActivityFeed activities={recentActivity} />
    </div>
  </div>
);
};

export default Dashboard;