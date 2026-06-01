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
      setLoans({
        active: data?.active || [],
        upcoming: data?.upcoming || [],
        completed: data?.completed || []
      });
    } catch (error) {
      console.error('Failed to fetch loans:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-50 text-green-700 border-green-200',
      overdue: 'bg-red-50 text-red-700 border-red-200',
      completed: 'bg-slate-50 text-slate-700 border-slate-200',
      pending: 'bg-amber-50 text-amber-700 border-amber-200'
    };
    return badges[status] || 'bg-slate-50 text-slate-700 border-slate-200';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-slate-200 rounded-full w-1/3"></div>
          <div className="space-y-4">
            <div className="h-32 bg-slate-100 rounded-2xl"></div>
            <div className="h-32 bg-slate-100 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Active Loans */}
      {loans.active.length > 0 && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
            Active Loans
          </h3>
          <div className="space-y-5">
            {loans.active.map((loan) => (
              <div key={loan.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-blue-100 transition-all duration-300 group">
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl">
                      🏦
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">Loan #{loan.loanId}</p>
                      <p className="text-sm text-gray-500 font-medium">Disbursed: {new Date(loan.disbursedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(loan.status)}`}>
                    {loan.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-5 bg-slate-50 p-4 rounded-xl">
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Principal</p>
                    <p className="font-bold text-gray-900 text-lg">₹{loan.principal.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">EMI</p>
                    <p className="font-bold text-gray-900 text-lg">₹{Math.round(loan.emi).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Next Due</p>
                    <p className="font-bold text-blue-700 text-lg">{new Date(loan.nextDueDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="mb-2 flex justify-between text-sm font-medium">
                  <span className="text-green-600">Paid: ₹{loan.paidAmount.toLocaleString()}</span>
                  <span className="text-gray-500">Left: ₹{(loan.principal - loan.paidAmount).toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 mb-5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(loan.paidAmount / loan.principal) * 100}%` }}
                  />
                </div>
                
                <Link
                  to={`/loans/${loan.id}`}
                  className="inline-flex items-center text-blue-700 font-semibold text-sm hover:text-blue-800 group-hover:translate-x-1 transition-transform"
                >
                  View Details <span className="ml-1">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Payments */}
      {loans.upcoming.length > 0 && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-amber-500 rounded-full inline-block"></span>
            Upcoming Payments
          </h3>
          <div className="space-y-4">
            {loans.upcoming.map((payment) => (
              <div key={payment.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-5 bg-amber-50/50 rounded-2xl border border-amber-100 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-amber-500 shadow-sm border border-amber-100">
                    ⚠️
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Loan #{payment.loanId}</p>
                    <p className="text-sm font-medium text-gray-600">Due: <span className="text-amber-700">{new Date(payment.dueDate).toLocaleDateString()}</span></p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                  <p className="font-bold text-xl text-gray-900">₹{payment.amount.toLocaleString()}</p>
                  <Link
                    to={`/repayments/${payment.id}/pay`}
                    className="px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
                  >
                    Pay Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Loans */}
      {loans.completed.length > 0 && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-green-500 rounded-full inline-block"></span>
            Completed Loans
          </h3>
          <div className="space-y-4">
            {loans.completed.map((loan) => (
              <div key={loan.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    🏆
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Loan #{loan.loanId}</p>
                    <p className="text-sm font-medium text-gray-500">Completed: {new Date(loan.completedDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                  <p className="text-sm font-medium text-gray-600">Total Paid: <span className="font-bold text-gray-900">₹{loan.totalPaid.toLocaleString()}</span></p>
                  <Link
                    to={`/loans/${loan.id}`}
                    className="text-sm font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1"
                  >
                    View Certificate <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {loans.active.length === 0 && loans.upcoming.length === 0 && loans.completed.length === 0 && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📭</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No Loans Yet</h3>
          <p className="text-gray-500 text-lg mb-8 max-w-sm mx-auto">Ready to get started with your first loan? The process is quick and completely paperless.</p>
          <Link
            to="/apply-loan"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors shadow-sm"
          >
            Apply for Loan Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default LoanSummary;