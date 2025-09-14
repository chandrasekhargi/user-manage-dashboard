// backend/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../database');

// GET all users
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'success', data: rows });
  });
});

// GET user by id
router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'success', data: row });
  });
});

// CREATE user
router.post('/', (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });
  const sql = 'INSERT INTO users (name, email, role) VALUES (?, ?, ?)';
  db.run(sql, [name, email, role || 'User'], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    const newUser = { id: this.lastID, name, email, role: role || 'User' };
    res.status(201).json({ message: 'User created', data: newUser });
  });
});

// UPDATE user
router.put('/:id', (req, res) => {
  const { name, email, role } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?';
  db.run(sql, [name, email, role, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated' });
  });
});

// DELETE user
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  db.run(sql, [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  });
});

module.exports = router;
