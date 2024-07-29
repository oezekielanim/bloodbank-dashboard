/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStateChanged, logOut, getUserRole } from "./firebase";
import Sidebar from "./components/Sidebar";
import DashboardOverview from "./components/DashboardOverview";
import DonationRequests from "./components/DonationRequests";
import Appointments from "./components/Appointments";
import DataManagement from "./components/DataManagement";
import Notifications from "./components/Notifications";
import SendNotification from "./components/SendNotification";
import LoginHospital from "./components/LoginHospital";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import LoginPage from "./components/Login";
import RegisterHospital from "./components/RegisterHospital";
// import Login from "./components/Login";

const ADMIN_EMAIL = "bloodbank@gmail.com";

function App() {
  const [user, setUser] = useState(null);
  const [activeComponent, setActiveComponent] = useState("LoginPage");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = authStateChanged(async (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        if (user.email === ADMIN_EMAIL) {
          setUserRole("admin");
        } else {
          const role = await getUserRole(user.uid);
          setUserRole(role);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setUserRole(null);
      }
    });
    return unsubscribe;
  }, []);

  

  const renderComponent = () => {
    switch (activeComponent) {
      case "LoginPage":
        return <LoginPage setIsAuthenticated={setIsAuthenticated} setActiveComponent={setActiveComponent} setUserRole={setUserRole} />;
      case "DashboardOverview":
        return <DashboardOverview />;
      case "DonationRequests":
        return <DonationRequests />;
      case "Appointments":
        return <Appointments />;
      case "DataManagement":
        return <DataManagement />;
      case "Notifications":
        return <Notifications />;
      case "SendNotification":
        return <SendNotification />;
      case "Profile":
        return <Profile />;
      case "LoginHospital":
        return <LoginHospital/>;
      case "Logout":
        return <Logout />;
      case "RegisterHospital":
        return <RegisterHospital />;
      default:
        return <LoginPage />;
    }
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <div className="flex">
        {isAuthenticated && activeComponent !== "LoginPage" && <Sidebar setActiveComponent={setActiveComponent} userRole={userRole} />}
        <main className="flex-1 p-4"> 
          {renderComponent()}
        </main>
      </div>
    </div>
  );
}

export default App;
