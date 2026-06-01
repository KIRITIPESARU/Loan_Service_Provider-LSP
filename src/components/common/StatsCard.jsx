// src/components/common/StatsCard.jsx
import React from 'react';

const StatsCard = ({ title, value, icon, color = 'blue' }) => {
  const colorSchemes = {
    blue: {
      cardBg: 'from-blue-50 to-white hover:shadow-blue-100/50',
      iconBg: 'bg-blue-100 text-blue-600',
      progressBg: 'bg-blue-600'
    },
    green: {
      cardBg: 'from-green-50 to-white hover:shadow-green-100/50',
      iconBg: 'bg-green-100 text-green-600',
      progressBg: 'bg-green-600'
    },
    orange: {
      cardBg: 'from-orange-50 to-white hover:shadow-orange-100/50',
      iconBg: 'bg-orange-100 text-orange-600',
      progressBg: 'bg-orange-600'
    },
    purple: {
      cardBg: 'from-purple-50 to-white hover:shadow-purple-100/50',
      iconBg: 'bg-purple-100 text-purple-600',
      progressBg: 'bg-purple-600'
    }
  };

  const activeScheme = colorSchemes[color] || colorSchemes.blue;

  return (
    <div className={`bg-gradient-to-br ${activeScheme.cardBg} border border-gray-100 rounded-2xl p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex items-center justify-between`}>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-extrabold text-gray-800 mt-2 tracking-tight">{value}</p>
      </div>
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-inner ${activeScheme.iconBg}`}>
        {icon}
      </div>
    </div>
  );
};

export default StatsCard;
