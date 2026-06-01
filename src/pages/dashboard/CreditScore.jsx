// src\pages\dashboard\CreditScore.jsx
import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CreditScore = () => {
  const [creditData, setCreditData] = useState({
    score: 0,
    rating: '',
    factors: [],
    history: []
  });
  const [loading, setLoading] = useState(true);
  const { get } = useApi();

  useEffect(() => {
    fetchCreditScore();
  }, []);

  const fetchCreditScore = async () => {
    try {
      const data = await get('/user/credit-score');
      setCreditData(data);
    } catch (error) {
      console.error('Failed to fetch credit score:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (score) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 650) return 'text-yellow-600';
    if (score >= 550) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRatingText = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    if (score >= 550) return 'Fair';
    return 'Poor';
  };

  const getProgressColor = (score) => {
    if (score >= 750) return 'bg-green-600';
    if (score >= 650) return 'bg-yellow-600';
    if (score >= 550) return 'bg-orange-600';
    return 'bg-red-600';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Credit Score Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Credit Score</h3>
            <div className="relative inline-block">
              <svg className="w-48 h-48 mx-auto">
                <circle
                  className="text-gray-200"
                  strokeWidth="12"
                  stroke="currentColor"
                  fill="transparent"
                  r="88"
                  cx="96"
                  cy="96"
                />
                <circle
                  className={getProgressColor(creditData.score)}
                  strokeWidth="12"
                  strokeDasharray={`${(creditData.score / 900) * 552} 552`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="88"
                  cx="96"
                  cy="96"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className={`text-4xl font-bold ${getRatingColor(creditData.score)}`}>
                  {creditData.score}
                </div>
                <div className="text-sm text-gray-500">out of 900</div>
              </div>
            </div>
            <div className="mt-4">
              <div className={`text-xl font-bold ${getRatingColor(creditData.score)}`}>
                {getRatingText(creditData.score)}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {creditData.score >= 750 
                  ? "Excellent! You qualify for best rates." 
                  : creditData.score >= 650 
                  ? "Good score. You're eligible for most loans."
                  : creditData.score >= 550
                  ? "Fair score. Consider improving before applying."
                  : "Poor score. Work on improving your credit."}
              </p>
            </div>
          </div>
        </div>

        {/* Score Factors */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Factors</h3>
            <div className="space-y-4">
              {creditData.factors.map((factor, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{factor.name}</span>
                    <span className="text-gray-600">{factor.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${factor.impact === 'positive' ? 'bg-green-600' : 'bg-red-600'}`}
                      style={{ width: `${factor.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Score History Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Score History</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={creditData.history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[300, 900]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditScore;