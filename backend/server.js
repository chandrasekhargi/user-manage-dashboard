// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/users');

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
