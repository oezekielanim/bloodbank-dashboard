// src/pages/DashboardOverview.js
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { firebaseApp } from '../firebase';
import Card from './Card';

const DashboardOverview = () => {
  const [totalRequests, setTotalRequests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0); // Assuming you want to add pending requests count as well
  const [upcomingAppointments, setUpcomingAppointments] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      const db = getFirestore(firebaseApp);

      // Fetch donation requests
      const donationRequestsCollection = collection(db, 'BloodRequests');
      const donationRequestsSnapshot = await getDocs(donationRequestsCollection);
      setTotalRequests(donationRequestsSnapshot.size);

      // Fetch pending requests
      const pendingRequestsCollection = collection(db, 'PendingRequests');
      const pendingRequestsSnapshot = await getDocs(pendingRequestsCollection);
      setPendingRequests(pendingRequestsSnapshot.size);

      // Fetch appointments
      const appointmentsCollection = collection(db, 'DonationSchedules');
      const appointmentsSnapshot = await getDocs(appointmentsCollection);
      setUpcomingAppointments(appointmentsSnapshot.size);
    };

    fetchCounts();
  }, []);

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-800 pb-2">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Total Requests" onClick={() => handleCardClick('/donation-requests')}>
          {totalRequests}
        </Card>
        <Card title="Pending Requests">
          {pendingRequests}
        </Card>
        <Card title="Upcoming Appointments" onClick={() => handleCardClick('/appointments')}>
          {upcomingAppointments}
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
