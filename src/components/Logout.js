
// src/pages/Logout.js
import React, { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { firebaseApp } from '../firebase';

const Logout = () => {
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth).then(() => {
      navigate('/login');
    });
  }, [auth, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
