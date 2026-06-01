// src\pages\loan\ApplyLoan.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyForLoan } from '../../store/thunks/loanThunks';
import { calculateEMI, calculateEligibility } from '../../utils/calculators';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const ApplyLoan = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loanDetails, setLoanDetails] = useState({
    amount: '',
    tenure: 12,
    purpose: 'personal',
    interestRate: 12,
    emi: 0
  });
  const [eligibility, setEligibility] = useState({
    eligible: false,
    maxAmount: 0,
    message: ''
  });

  useEffect(() => {
    const emi = calculateEMI(loanDetails.amount, loanDetails.interestRate, loanDetails.tenure);
    setLoanDetails(prev => ({ ...prev, emi }));
  }, [loanDetails.amount, loanDetails.interestRate, loanDetails.tenure]);

  useEffect(() => {
    const eligibilityResult = calculateEligibility(user, loanDetails.amount);
    setEligibility(eligibilityResult);
  }, [loanDetails.amount, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoanDetails({ ...loanDetails, [name]: value });
  };

  const handleSubmit = async () => {
    if (!eligibility.eligible) {
      alert('You are not eligible for this loan amount');
      return;
    }
    await dispatch(applyForLoan(loanDetails));
  };

  const getEligibilityColor = () => {
    if (eligibility.eligible) return 'text-green-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Apply for Loan</h2>
          <p className="text-blue-100 mt-1">
            Get instant approval and quick disbursal
          </p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={loanDetails.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {loanDetails.amount && (
                  <div className="mt-2">
                    <div className="flex justify-between text-sm">
                      <span>Min: ₹10,000</span>
                      <span>Max: ₹50,00,000</span>
                    </div>
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ width: `${Math.min((loanDetails.amount / 5000000) * 100, 100)}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Purpose
                </label>
                <select
                  name="purpose"
                  value={loanDetails.purpose}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="personal">Personal Loan</option>
                  <option value="home">Home Loan</option>
                  <option value="car">Car Loan</option>
                  <option value="education">Education Loan</option>
                  <option value="business">Business Loan</option>
                  <option value="debt">Debt Consolidation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tenure (Months)
                </label>
                <input
                  type="range"
                  name="tenure"
                  min="6"
                  max="60"
                  step="6"
                  value={loanDetails.tenure}
                  onChange={handleInputChange}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>6</span>
                  <span>12</span>
                  <span>24</span>
                  <span>36</span>
                  <span>48</span>
                  <span>60</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {loanDetails.tenure} months ({Math.floor(loanDetails.tenure / 12)} years {loanDetails.tenure % 12} months)
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Loan Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount:</span>
                  <span className="font-semibold">₹{parseInt(loanDetails.amount || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-semibold">{loanDetails.interestRate}% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tenure:</span>
                  <span className="font-semibold">{loanDetails.tenure} months</span>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Monthly EMI:</span>
                  <span className="font-bold text-blue-600">₹{Math.round(loanDetails.emi).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Interest:</span>
                  <span>₹{Math.round(loanDetails.emi * loanDetails.tenure - loanDetails.amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Payment:</span>
                  <span>₹{Math.round(loanDetails.emi * loanDetails.tenure).toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Eligibility Status:</span>
                  <span className={`font-bold ${getEligibilityColor()}`}>
                    {eligibility.eligible ? '✅ Eligible' : '❌ Not Eligible'}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-2">{eligibility.message}</p>
                {!eligibility.eligible && eligibility.maxAmount > 0 && (
                  <p className="text-xs text-blue-600 mt-1">
                    Maximum eligible amount: ₹{eligibility.maxAmount.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button onClick={handleSubmit} className="flex-1" disabled={!loanDetails.amount || !eligibility.eligible}>
              Apply for Loan
            </Button>
            <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyLoan;