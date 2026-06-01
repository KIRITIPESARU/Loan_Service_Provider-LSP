// src\pages\legal\TermsOfService.jsx
import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-blue max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using LSP Platform, you agree to be bound by these Terms of Service
            and all applicable laws and regulations.
          </p>

          <h2>2. Loan Services</h2>
          <p>
            LSP Platform provides a marketplace connecting borrowers with lenders. We facilitate
            loan applications, verification, and disbursement processes.
          </p>

          <h2>3. Eligibility</h2>
          <p>
            To use our services, you must be at least 18 years old, a resident of India, and have
            the legal capacity to enter into binding contracts.
          </p>

          <h2>4. KYC Requirements</h2>
          <p>
            All users must complete KYC verification as per RBI guidelines. Valid documents include
            PAN card, Aadhaar card, and proof of income.
          </p>

          <h2>5. Privacy and Data Security</h2>
          <p>
            We are committed to protecting your privacy. All personal data is handled in accordance
            with our Privacy Policy and applicable data protection laws.
          </p>

          <h2>6. Fees and Charges</h2>
          <p>
            Loan processing fees, interest rates, and other charges will be clearly disclosed before
            loan approval. No hidden charges apply.
          </p>

          <h2>7. Default and Recovery</h2>
          <p>
            In case of default, we reserve the right to take legal action as per applicable laws.
            Late payment fees and penalties will be applied as per the loan agreement.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            LSP Platform acts as an intermediary and is not responsible for lender-borrower disputes.
            Our liability is limited to the services we directly provide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;