/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStateChanged, logOut } from "./firebase";
import Sidebar from "./components/Sidebar";
import DashboardOverview from "./components/DashboardOverview";
import DonationRequests from "./components/DonationRequests";
import Appointments from "./components/Appointments";
import DataManagement from "./components/DataManagement";
import Notifications from "./components/Notifications";
import SendNotification from "./components/SendNotification";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import LoginPage from "./components/Login";
// import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);
  const [activeComponent, setActiveComponent] = useState("LoginPage");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = authStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    logOut().then(() => {
      setIsAuthenticated(false);
      setActiveComponent("LoginPage");
      navigate("/login");
    });
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "LoginPage":
        return <LoginPage setIsAuthenticated={setIsAuthenticated} setActiveComponent={setActiveComponent} />;
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
      case "Logout":
        return <Logout />;
      default:
        return <LoginPage />;
    }
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <div className="flex">
        {activeComponent !== "LoginPage" && <Sidebar setActiveComponent={setActiveComponent} />}
        <main className="flex-1 p-4">
          {/* {activeComponent !== "LoginPage" && (
            <button
              onClick={handleLogout}
              className="mb-4 p-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          )} */}
          {renderComponent()}
        </main>
      </div>
    </div>
  );
}

export default App;
