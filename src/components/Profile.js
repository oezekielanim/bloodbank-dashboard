
// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { firebaseApp } from '../firebase';

const Profile = () => {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const user = auth.currentUser;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name);
          setEmail(userData.email);
          setLoading(false);
        } else {
          setLoading(false);
          setError('No profile data found.');
        }
      } else {
        setLoading(false);
        setError('User not authenticated.');
      }
    };

    fetchProfile();
  }, [user, db]);

  const handleUpdateProfile = async () => {
    if (!name || !email) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      if (user) {
        await updateProfile(user, {
          displayName: name,
        });

        await updateDoc(doc(db, 'users', user.uid), {
          name: name,
          email: email,
        });

        setSuccess('Profile updated successfully!');
      }
    } catch (error) {
      setError('Failed to update profile: ' + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {success && <div className="mb-4 text-green-600">{success}</div>}
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          readOnly
          className="mt-1 p-2 border border-gray-300 rounded w-full bg-gray-100"
        />
      </div>
      <button
        onClick={handleUpdateProfile}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update Profile
      </button>
    </div>
  );
};

export default Profile;
