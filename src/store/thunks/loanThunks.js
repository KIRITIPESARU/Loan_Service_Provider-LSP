// src/store/thunks/loanThunks.js

export const applyForLoan = (loanData) => async (dispatch) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      alert('Loan application submitted successfully! Our automated system is verifying your application.');
      resolve({ success: true, data: loanData });
    }, 1000);
  });
};
