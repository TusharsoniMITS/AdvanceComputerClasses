import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [formData, setFormData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/changepassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include' // For cookies (token)
      });

      const data = await res.json();
      if (data.status === 'success') {
        setMessage(data.message);
        navigate('/login')
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong!');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow rounded">
      <h2 className="text-xl mb-4">Change Password</h2>
      {message && <p className="mb-2 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-2 border"
        />
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={formData.oldPassword}
          onChange={handleChange}
          className="w-full p-2 mb-2 border"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full p-2 mb-2 border"
        />
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          className="w-full p-2 mb-4 border"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
