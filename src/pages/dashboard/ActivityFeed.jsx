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
      kyc_submitted: 'amber',
      kyc_verified: 'blue',
      document_uploaded: 'slate',
      agreement_signed: 'indigo'
    };
    return colors[type] || 'slate';
  };

  const getColorClasses = (color) => {
    const map = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      amber: 'bg-amber-50 text-amber-600',
      indigo: 'bg-indigo-50 text-indigo-600',
      slate: 'bg-slate-50 text-slate-600',
    };
    return map[color] || 'bg-slate-50 text-slate-600';
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-6 bg-slate-600 rounded-full inline-block"></span>
            Recent Activity
          </h3>
        </div>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📭</span>
          </div>
          <p className="text-gray-500 font-medium">No recent activity</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
          Recent Activity
        </h3>
        <Link to="/notifications" className="text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors">
          View All →
        </Link>
      </div>
      <div className="space-y-1">
        {activities.slice(0, 5).map((activity, index) => {
          const colorClass = getColorClasses(getActivityColor(activity.type));
          return (
            <div key={index} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 ${colorClass}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-base font-bold text-gray-900 truncate">{activity.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{activity.description}</p>
                <p className="text-xs font-medium text-gray-400 mt-1.5">{activity.timeAgo}</p>
              </div>
              {activity.actionUrl && (
                <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link to={activity.actionUrl} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg hover:bg-blue-100 transition-colors">
                    View
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;