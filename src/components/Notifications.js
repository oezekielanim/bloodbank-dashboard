
// src/pages/Notifications.js
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseApp } from '../firebase';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const db = getFirestore(firebaseApp);
      const notificationsCollection = collection(db, 'notifications');
      const notificationsSnapshot = await getDocs(notificationsCollection);
      const notificationsList = notificationsSnapshot.docs.map(doc => doc.data());
      setNotifications(notificationsList);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Message</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{notification.message}</td>
                <td className="px-4 py-2 border">{notification.date}</td>
                <td className="px-4 py-2 border">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notifications;
