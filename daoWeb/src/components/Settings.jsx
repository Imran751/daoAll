import React from 'react';

const Settings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p className="text-gray-700">This is the Settings page. You can customize your preferences here.</p>
      <div className="mt-4">
        <label className="block mb-2 font-medium text-gray-700">Notification Preferences</label>
        <select className="w-full px-3 py-2 border rounded">
          <option>Email Notifications</option>
          <option>Push Notifications</option>
          <option>Both</option>
          <option>None</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
