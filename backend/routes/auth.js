const { getRecords } = require('../database');
const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();

// POST /sign-in
router.post('/sign-in', async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization header missing" });
    }

    // Extract token from "Bearer <token>"
    const token = authorization.replace("Bearer ", "");

    try {
        const payload = jwt.verify(token, JWT_SECRET);

        console.log("Payload from token:", payload);
        console.log("Request Body User:", req.body.user);

        const record = await getRecords(req.body.user, req.body.password);

        if ((record.name = !req.body.user) || (record.password = !req.body.password)) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        return res.status(200).json({
            message: "User Logged in Successfully",
            token
        });

    } catch (err) {
        console.error("JWT Verification Error:", err);
        return res.status(403).json({ error: "Could not verify token" });
    }
});

module.exports = router;
