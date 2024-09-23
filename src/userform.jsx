import React, { useState, useEffect } from 'react';
import './UserForm.css';

function UserForm({ addUser, editUser, updateUser }) {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    if (editUser) {
      setUser(editUser);
    } else {
      setUser({ name: '', email: '' });
    }
  }, [editUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editUser) {
      updateUser(user);
    } else {
      addUser(user);
    }
    setUser({ name: '', email: '' });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{editUser ? 'Edit User' : 'Add New User'}</h2>
      <input
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        required
      />
      <button type="submit">{editUser ? 'Update User' : 'Add User'}</button>
    </form>
  );
}

export default UserForm;
