const cors = require('cors');
require("dotenv").config(); // Load the .env file
const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(cors({
	origin: '*', // Allow all origins; restrict in production as needed
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));