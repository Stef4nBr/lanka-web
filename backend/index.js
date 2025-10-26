const cors = require('cors');
require("dotenv").config(); // Load the .env file
const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');

// Increase payload limit for JSON (fallback for non-multipart requests)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
	origin: '*', // Allow all origins; restrict in production as needed
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));