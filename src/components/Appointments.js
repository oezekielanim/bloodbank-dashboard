/* eslint-disable react-hooks/exhaustive-deps */

// src/components/Appointments.js
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseApp } from '../firebase';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const db = getFirestore(firebaseApp);
      const appointmentsCollection = collection(db, 'DonationSchedules');
      const appointmentsSnapshot = await getDocs(appointmentsCollection);
      const appointmentsList = appointmentsSnapshot.docs.map(doc => doc.data());
      // console.log(appointmentsList)
      setAppointments(appointmentsList);
      console.log(appointments)
    };

    fetchAppointments();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{appointment.fullName}</td>
                <td className="px-4 py-2 border">{appointment.appDate}</td>
                <td className="px-4 py-2 border">{appointment.hospital}</td>
                <td className="px-4 py-2 border">{appointment.phoneNum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
