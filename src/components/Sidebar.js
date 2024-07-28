// import React from 'react';

// const Sidebar = ({ setActiveComponent }) => {
//   return (
//     <nav className="bg-gray-800 text-white h-screen p-4 w-64">
//       <ul className="space-y-4">
//         <li className="cursor-pointer hover:bg-gray-700 p-2" onClick={() => setActiveComponent('DashboardOverview')}>Dashboard Overview</li>
//         <li className="cursor-pointer hover:bg-gray-700 p-2" onClick={() => setActiveComponent('DonationRequests')}>Donation Requests</li>
//         <li className="cursor-pointer hover:bg-gray-700 p-2" onClick={() => setActiveComponent('Appointments')}>Appointments</li>
//         <li className="cursor-pointer hover:bg-gray-700 p-2" onClick={() => setActiveComponent('DataManagement')}>Data Management</li>
//         <li className="cursor-pointer hover:bg-gray-700 p-2" onClick={() => setActiveComponent('Notifications')}>Notifications</li>
//       </ul>
//     </nav>
//   );
// };

// export default Sidebar;

// src/components/Sidebar.js
import React from 'react';

const Sidebar = ({ setActiveComponent }) => {
  return (
    <nav className="bg-gray-800 text-white h-screen p-4 w-64">
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
        <li className="mb-4">
          <button onClick={() => setActiveComponent('DataManagement')} className="text-lg font-semibold">Data Management</button>
        </li>
        {/* <li className="mb-4">
          <button onClick={() => setActiveComponent('Notifications')} className="text-lg font-semibold">Notifications</button>
        </li> */}
        {/* <li className="mb-4">
          <button onClick={() => setActiveComponent('SendNotification')} className="text-lg font-semibold">Send Notification</button>
        </li> */}
        <li className="mb-4">
          <button onClick={() => setActiveComponent('Profile')} className="text-lg font-semibold">Profile</button>
        </li>
        <li className="mb-4">
          <button onClick={() => setActiveComponent('Logout')} className="text-lg font-semibold ">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
