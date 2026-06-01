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
      color: 'amber',
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
      color: 'rose',
      path: '/credit-score',
      description: 'Check your score'
    }
  ];

  const getColorClasses = (color) => {
    const map = {
      blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100',
      green: 'bg-green-50 text-green-600 group-hover:bg-green-100',
      purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-100',
      amber: 'bg-amber-50 text-amber-600 group-hover:bg-amber-100',
      indigo: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100',
      rose: 'bg-rose-50 text-rose-600 group-hover:bg-rose-100',
    };
    return map[color] || 'bg-gray-50 text-gray-600 group-hover:bg-gray-100';
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-purple-600 rounded-full inline-block"></span>
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            className="p-5 rounded-2xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 group flex flex-col items-center text-center bg-white hover:-translate-y-1"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3 transition-colors ${getColorClasses(action.color)}`}>
              {action.icon}
            </div>
            <span className="text-sm font-bold text-gray-900 mb-1">{action.title}</span>
            <p className="text-xs text-gray-500 font-medium">{action.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;