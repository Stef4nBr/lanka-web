const { getRecords } = require('../database');
const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();

// POST /sign-in
router.post('/sign-in', async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const { username, password } = req.body;

    try {
        const record = await getRecords(username, password);

        // Check credentials
        if (!record || record.name !== username || record.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ username: record.name }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: "User Logged in Successfully",
            token
        });

    } catch (err) {
        console.error("Auth Error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
