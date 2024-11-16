const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(express.static("public"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    // cookie: {
    //     secure: true,
    //     httpOnly: true,
    //     sameSite: 'lax'
    //   }
}));


app.set('trust proxy', 1); // Trust first proxy

mongoose.connect(process.env.MONGO_URI);

const port = process.env.PORT || 8080;


app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/challengeRoutes"));
app.use("/api", require("./routes/completedChallengeRoutes"));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});