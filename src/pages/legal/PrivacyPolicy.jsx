// src\pages\legal\PrivacyPolicy.jsx
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-blue max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            We collect personal information including name, contact details, financial information,
            KYC documents, and usage data to provide our loan services.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            Your information is used for loan processing, KYC verification, credit assessment,
            communication, and improving our services.
          </p>

          <h2>3. Data Sharing</h2>
          <p>
            We share your data with partner lenders, credit bureaus, and regulatory authorities
            as required for loan processing and compliance.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard security measures including encryption, access controls,
            and regular security audits to protect your data.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We retain your data for as long as necessary to provide services and comply with legal
            obligations, typically 7 years after account closure.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data. You may also
            withdraw consent for data processing at any time.
          </p>

          <h2>7. Cookies</h2>
          <p>
            We use cookies to improve user experience and analyze website traffic. You can control
            cookie preferences through your browser settings.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            For privacy concerns, contact our Data Protection Officer at privacy@lsp-platform.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;