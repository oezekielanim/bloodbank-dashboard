import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firebaseApp } from '../firebase';

const DataManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const db = getFirestore(firebaseApp);
      const usersCollection = collection(db, 'Users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditMode(true);
  };

  const handleSaveUser = async () => {
    const db = getFirestore(firebaseApp);
    const userDoc = doc(db, 'Users', selectedUser.id);
    await updateDoc(userDoc, { ...selectedUser });
    setEditMode(false);
  };

  const handleDeleteUser = async (userId) => {
    const db = getFirestore(firebaseApp);
    const userDoc = doc(db, 'Users', userId);
    await deleteDoc(userDoc);
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Data Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{user.username}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editMode && (
        <div className="p-4 bg-white shadow-md rounded-lg mt-4">
          <h2 className="text-2xl font-bold mb-4">Edit User</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              value={selectedUser.name}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              value={selectedUser.email}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
            />
          </div>
          <button
            onClick={handleSaveUser}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default DataManagement;
