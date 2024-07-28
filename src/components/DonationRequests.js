// src/pages/DonationRequests.js
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firebaseApp } from '../firebase';

const DonationRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const db = getFirestore(firebaseApp);
      const requestsCollection = collection(db, 'BloodRequests');
      const requestsSnapshot = await getDocs(requestsCollection);
      const requestsList = requestsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRequests(requestsList);
    };

    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    const db = getFirestore(firebaseApp);
    await deleteDoc(doc(db, 'BloodRequests', id));
    setRequests(requests.filter(request => request.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Donation Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Blood Type</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="px-4 py-2 border">{request.fullName}</td>
                <td className="px-4 py-2 border">{request.bloodType}</td>
                <td className="px-4 py-2 border">{request.requestDate}</td>
                <td className="px-4 py-2 border">{request.hospital}</td>
                <td className="px-4 py-2 border">{request.status}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(request.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
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

export default DonationRequests;
