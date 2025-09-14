import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css'

const API = 'http://localhost:8080/api/users';

export default function UserForm() {
  const [user, setUser] = useState({ name: '', email: '', role: 'User' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // fetch user
      axios.get(`${API}/${id}`)
        .then(res => setUser(res.data.data))
        .catch(() => setError('Failed to load user'));
    }
  }, [id]);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email) {
      setError('Name and email are required');
      return;
    }
    setLoading(true);
    try {
      if (id) {
        await axios.put(`${API}/${id}`, user);
        alert('User updated');
      } else {
        await axios.post(API, user);
        alert('User created');
      }
      navigate('/');
    } catch (err) {
      setError('Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit User' : 'Add User'}</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" value={user.name} onChange={handleChange} />
        <label>Email</label>
        <input name="email" value={user.email} onChange={handleChange} />
        <label>Role</label>
        <select name="role" value={user.role} onChange={handleChange}>
          <option>Admin</option>
          <option>User</option>
        </select>
        <div>
          <button className='user-save-btn' type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
}
