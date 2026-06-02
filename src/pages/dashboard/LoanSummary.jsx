// src/pages/dashboard/LoanSummary.jsx
import React from 'react';

const LoanSummary = ({ data, nextPaymentDate }) => {
  const { totalEmi, nextDue, loans = [] } = data;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <i className="fas fa-chart-pie text-indigo-500"></i> Loan Portfolio
        </h2>
        <button className="text-sm text-indigo-600 font-medium hover:underline">
          View Details <i className="fas fa-arrow-right ml-1"></i>
        </button>
      </div>
      
      <div className="p-6">
        {/* Summary Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-50 p-4 rounded-xl">
            <p className="text-slate-500 text-sm">Total EMI (Monthly)</p>
            <p className="text-2xl font-bold text-slate-800">
              {totalEmi || '₹12,450'}
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl">
            <p className="text-slate-500 text-sm">Next Due Date</p>
            <p className="text-2xl font-bold text-amber-600">
              {nextDue || nextPaymentDate}
            </p>
          </div>
        </div>

        {/* Loan List */}
        <div className="space-y-6">
          {loans.map((loan, index) => (
            <div key={index} className="border-b border-slate-100 pb-5 last:border-0">
              <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                <div>
                  <h4 className="font-bold text-lg text-slate-800">{loan.name}</h4>
                  <p className="text-sm text-slate-500">
                    Principal: {loan.amount} • Interest {loan.interest}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-indigo-700">EMI {loan.emi}</p>
                  <p className="text-xs text-slate-400">{loan.remainingMonths} months left</p>
                </div>
              </div>
              
              <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full"
                  style={{ width: `${loan.paid}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>{loan.paid}% paid off</span>
                <span><i className="far fa-calendar-alt"></i> Next: {nextPaymentDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoanSummary;