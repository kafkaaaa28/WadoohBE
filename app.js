const express = require('express');
const cors = require('cors');
const authRoutes = require('./Routes/authRoutes.js');
const userRoutes = require('./Routes/userRoutes.js');
const locationRoutes = require('./Routes/locationRoutes.js');
const app = express();
const corsOptions = {
  origin: ['http://192.168.100.230:3000', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/petani', locationRoutes);
module.exports = app;
