// src\pages\dashboard\QuickActions.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  const actions = [
    {
      title: 'Apply for Loan',
      icon: '💰',
      color: 'blue',
      path: '/apply-loan',
      description: 'Get instant approval'
    },
    {
      title: 'Make Payment',
      icon: '💳',
      color: 'green',
      path: '/repayments',
      description: 'Pay your EMI'
    },
    {
      title: 'Check KYC',
      icon: '🆔',
      color: 'purple',
      path: '/kyc',
      description: 'Complete verification'
    },
    {
      title: 'Get Support',
      icon: '💬',
      color: 'orange',
      path: '/support',
      description: '24/7 assistance'
    },
    {
      title: 'Loan Calculator',
      icon: '📊',
      color: 'indigo',
      path: '/loan-calculator',
      description: 'Plan your EMI'
    },
    {
      title: 'Credit Score',
      icon: '📈',
      color: 'red',
      path: '/credit-score',
      description: 'Check your score'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            className={`p-3 rounded-lg border border-gray-200 hover:shadow-md transition group`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{action.icon}</span>
              <span className="text-sm font-medium text-gray-800">{action.title}</span>
            </div>
            <p className="text-xs text-gray-500">{action.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;