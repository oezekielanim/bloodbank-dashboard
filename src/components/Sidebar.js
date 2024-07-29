import React from 'react';
import logo from "../Images/logo.png";

const Sidebar = ({ setActiveComponent, userRole }) => {
  return (
    <nav className="bg-gray-700 text-white h-screen p-4 w-64">
      <img 
          src={logo} // Replace this with the path to your image
          alt="logo"
          className="mb-5 mx-auto" 
          style={{ width: '200px', height: '150px' }} // Adjust the width and height as needed
        />
      <ul>
        <li className="mb-4">
          <button onClick={() => setActiveComponent('DashboardOverview')} className="text-lg font-semibold">Dashboard Overview</button>
        </li>
        <li className="mb-4">
          <button onClick={() => setActiveComponent('DonationRequests')} className="text-lg font-semibold">Donation Requests</button>
        </li>
        <li className="mb-4">
          <button onClick={() => setActiveComponent('Appointments')} className="text-lg font-semibold">Appointments</button>
        </li>
        {userRole === "admin" && (
          <>
            <li className="mb-4">
              <button onClick={() => setActiveComponent('DataManagement')} className="text-lg font-semibold">Data Management</button>
            </li>
            <li className='mb-4'>
              <button onClick={() => setActiveComponent('RegisterHospital')} className="text-lg font-semibold">Register Hospital</button>
            </li>
          </>
        )}
        <li className="mb-4">
          <button onClick={() => setActiveComponent('Logout')} className="text-lg font-semibold">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
