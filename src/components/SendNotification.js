// src/components/SendNotification.js
import React, { useState } from 'react';

function SendNotification() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSendNotification = async () => {
    if (!title || !message) {
      alert('Please fill in both the title and message.');
      return;
    }

    // Here you would typically send the notification to your backend which will then send it to your app users
    // For example:
    // await sendNotificationToUsers({ title, message });

    alert('Notification sent successfully!');
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Send Notification</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Message</label>
        <textarea
          className="w-full px-3 py-2 border rounded-lg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        onClick={handleSendNotification}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Send Notification
      </button>
    </div>
  );
}

export default SendNotification;
