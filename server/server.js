const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const admin = require("firebase-admin");
const verifyFirebaseToken = require("./middleware/verifyFirebaseToken");


require('dotenv').config();

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(require("./firebase-keys.json")),
});

const app = express();

app.use(cors());

app.use(express.static("public"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false
}));

mongoose.connect(process.env.MONGO_URI);

const port = process.env.PORT || 8080;




app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});