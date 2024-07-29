/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, logIn, getUserRole } from "../firebase";
import logo from "../Images/logo.png";
import { auth} from "../firebase";


const LoginHospital = ({ setIsAuthenticated, setActiveComponent, setUserRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await logIn(email, password);
      const user = userCredential.user;

      if (user.email === "bloodbank@gmail.com") {
        setIsAuthenticated(true);
        setUserRole("admin");
        setActiveComponent("DashboardOverview");
        navigate("/dashboard-overview");
      } else {
        const role = await getUserRole(user.uid);
        if (role === "hospital") {
          setIsAuthenticated(true);
          setUserRole("hospital");
          setActiveComponent("DonationRequests");
          navigate("/donation-requests");
        } else {
          setError("Access denied. Only authorized users can log in.");
          console.log("Access denied. Only authorized users can log in.");
        }
      }
    } catch (error) {
      setError("Incorrect details");
      console.log("Error logging in:", error.message);
    }
  };

  return (
      <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
        {/* <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${splash})`,
            filter: 'blur(8px)',
            zIndex: -1
          }}
        >  </div> */}
      <div className="bg-white p-8 rounded shadow-md w-96">
      <img 
          src={logo} // Replace this with the path to your image
          alt="logo"
          className="mb-5 mx-auto" 
          style={{ width: '200px', height: '150px' }} // Adjust the width and height as needed
        />
        
        <h1 className="text-xl font-bold mb-3 text-center">Hospital Login</h1>
        <h2 className=" mb-6 text-center">Enter your credentials to log in</h2>
     
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-gray-600">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginHospital;
