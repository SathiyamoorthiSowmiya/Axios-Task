import React, { useState, useEffect } from 'react';
import axios from 'axios';
import userList from './userlist.jsx';
import userForm from './userform.jsx';

import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  // Fetch all users
  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  // Add a new user
  const addUser = (user) => {
    axios.post(API_URL, user)
      .then(response => {
        setUsers([...users, response.data]);
      });
  };

  // Update a user
  const updateUser = (updatedUser) => {
    axios.put(`${API_URL}/${updatedUser.id}`, updatedUser)
      .then(response => {
        setUsers(users.map(user => user.id === updatedUser.id ? response.data : user));
        setEditUser(null); // Clear edit state after update
      });
  };

  // Delete a user
  const deleteUser = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      });
  };

  return (
    <div className="app-container">
      <h1>User Management</h1>
      <div className="content">
        <UserForm addUser={addUser} editUser={editUser} updateUser={updateUser} />
        <UserList users={users} deleteUser={deleteUser} setEditUser={setEditUser} />
      </div>
    </div>
  );
}

export default App;
