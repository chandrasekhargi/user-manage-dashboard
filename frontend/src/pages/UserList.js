import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.css'

const API = 'http://localhost:8080/api/users';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API);
      setUsers(res.data.data || []);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await axios.delete(`${API}/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div>
      <div className="topbar">
        <h2>Users</h2>
        <Link to="/add-user"><button className='add-user-btn' type="button">Add User</button></Link>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}

      {!loading && users.length === 0 && <p>No users yet. Add one!</p>}

      {users.length > 0 && (
        <table>
          <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="actions">
                  <Link to={`/edit-user/${user.id}`}><button className='edit-btn' type="button">Edit</button></Link>
                  <button className='delete-btn' type="button" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
