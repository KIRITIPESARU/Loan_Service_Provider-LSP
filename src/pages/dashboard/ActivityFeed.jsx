// src\pages\dashboard\ActivityFeed.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      loan_applied: '📝',
      loan_approved: '✅',
      loan_disbursed: '💰',
      payment_made: '💳',
      kyc_submitted: '🆔',
      kyc_verified: '✓',
      document_uploaded: '📄',
      agreement_signed: '✍️'
    };
    return icons[type] || '📢';
  };

  const getActivityColor = (type) => {
    const colors = {
      loan_applied: 'blue',
      loan_approved: 'green',
      loan_disbursed: 'purple',
      payment_made: 'green',
      kyc_submitted: 'yellow',
      kyc_verified: 'blue',
      document_uploaded: 'gray',
      agreement_signed: 'indigo'
    };
    return colors[type] || 'gray';
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
        </div>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📭</div>
          <p className="text-gray-500">No recent activity</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
        <Link to="/notifications" className="text-sm text-blue-600 hover:text-blue-700">
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {activities.slice(0, 5).map((activity, index) => (
          <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
            <div className={`text-2xl bg-${getActivityColor(activity.type)}-100 p-2 rounded-full`}>
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{activity.title}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.timeAgo}</p>
            </div>
            {activity.actionUrl && (
              <Link to={activity.actionUrl} className="text-xs text-blue-600 hover:text-blue-700">
                View
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;