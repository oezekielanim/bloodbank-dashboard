/* eslint-disable no-unused-vars */

// // src/pages/Logout.js
// import React, { useEffect } from 'react';
// import { getAuth, signOut } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { firebaseApp } from '../firebase';

// const Logout = () => {
//   const auth = getAuth(firebaseApp);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     signOut(auth).then(() => {
//       navigate('/login');
//     }).catch((error) => {
//       console.error('Error signing out:', error);
//     });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-96 text-center">
//         <h1 className="text-xl font-bold mb-4">Logout</h1>
//         <p className="mb-6">Are you sure you want to log out?</p>
//         <button 
//           onClick={handleLogout} 
//           className="w-full bg-red-500 text-white py-2 rounded hover:bg-gray-600"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Logout;





import React, { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { firebaseApp } from '../firebase';

const Logout = () => {
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();



 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h1 className="text-xl font-bold mb-4">Logout</h1>
        <p className="mb-6">Are you sure you want to log out?</p>
        <button 
         onClick={() => {
          signOut(auth)
            .then(() => {
              console.log("User signed out successfully.");
              navigate('/LoginPage');
            })
            .catch((error) => {
              console.error('Error signing out:', error);
              navigate('/LoginPage'); // Navigate to login page even if there's an error
            });
        }} 
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-gray-600"
      >
          Logout
        </button>
      </div>
    </div>
  );
};
export default Logout;








