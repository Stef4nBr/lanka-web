const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();


router.post('/sign-in', (req, res, next) => {
    // Extracting JWT secret from environment variable
    const JWT_SECRET = process.env.JWT_SECRET;
    //Extracting token from authorization header
    const { authorization } = req.headers;
    // Checking if authorization header is present
    //authorization === 'Bearer "token"'
    if (!authorization) {
        return res.status(404).send({ error: "Must be logged in" });
    }
    // Removing 'Bearer ' prefix to get the token
    const token = authorization.replace("Bearer ", "");
    //Verifying if the token is valid.
    jwt.verify(token, JWT_SECRET, async (err, payload) => {
        if (err) {
            return res.status(403).send("Could not verify token");
        }
        // Adding user information to the request object
        req.user = payload;
    });
    next();

    // return res
    //     .status(200)
    //     .json({ message: "User Logged in Successfully", token });
})

module.exports = router;