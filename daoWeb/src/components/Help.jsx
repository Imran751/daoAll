import React from 'react';

const Help = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Help</h1>
      <p className="text-gray-700">
        Need assistance? Check out the frequently asked questions below or contact support.
      </p>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">FAQs</h2>
        <ul className="list-disc pl-5">
          <li className="mb-2">How do I reset my password?</li>
          <li className="mb-2">How can I change my profile picture?</li>
          <li className="mb-2">How do I contact customer support?</li>
        </ul>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Contact Support</h2>
        <p>Email us at <a href="mailto:support@example.com" className="text-blue-500">support@example.com</a></p>
      </div>
    </div>
  );
};

export default Help;
