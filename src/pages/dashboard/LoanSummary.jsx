// src\pages\dashboard\LoanSummary.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

const LoanSummary = () => {
  const [loans, setLoans] = useState({
    active: [],
    upcoming: [],
    completed: []
  });
  const [loading, setLoading] = useState(true);
  const { get } = useApi();

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const data = await get('/user/loans/summary');
      setLoans(data);
    } catch (error) {
      console.error('Failed to fetch loans:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      completed: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active Loans */}
      {loans.active.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Loans</h3>
          <div className="space-y-4">
            {loans.active.map((loan) => (
              <div key={loan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium text-gray-800">Loan #{loan.loanId}</p>
                    <p className="text-sm text-gray-500">Taken on: {new Date(loan.disbursedDate).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(loan.status)}`}>
                    {loan.status.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Principal</p>
                    <p className="font-semibold">₹{loan.principal.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">EMI</p>
                    <p className="font-semibold">₹{Math.round(loan.emi).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Next Due</p>
                    <p className="font-semibold text-sm">{new Date(loan.nextDueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(loan.paidAmount / loan.principal) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Paid: ₹{loan.paidAmount.toLocaleString()}</span>
                  <span>Remaining: ₹{(loan.principal - loan.paidAmount).toLocaleString()}</span>
                </div>
                <Link
                  to={`/loans/${loan.id}`}
                  className="mt-3 inline-block text-blue-600 hover:text-blue-700 text-sm"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Payments */}
      {loans.upcoming.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Payments</h3>
          <div className="space-y-3">
            {loans.upcoming.map((payment) => (
              <div key={payment.id} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <p className="font-medium text-gray-800">Loan #{payment.loanId}</p>
                  <p className="text-sm text-gray-600">Due: {new Date(payment.dueDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">₹{payment.amount.toLocaleString()}</p>
                  <Link
                    to={`/repayments/${payment.id}/pay`}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Pay Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Loans */}
      {loans.completed.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Completed Loans</h3>
          <div className="space-y-3">
            {loans.completed.map((loan) => (
              <div key={loan.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Loan #{loan.loanId}</p>
                  <p className="text-sm text-gray-500">Completed on: {new Date(loan.completedDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Paid: ₹{loan.totalPaid.toLocaleString()}</p>
                  <Link
                    to={`/loans/${loan.id}`}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    View Certificate →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {loans.active.length === 0 && loans.upcoming.length === 0 && loans.completed.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Loans Yet</h3>
          <p className="text-gray-600 mb-4">Ready to get started with your first loan?</p>
          <Link
            to="/apply-loan"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Apply for Loan
          </Link>
        </div>
      )}
    </div>
  );
};

export default LoanSummary;