const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const passport = require('./auth');

app.use(bodyParser.json());

// Simple middleware function to show time of log
const logRequest = (req, res, next) => {
    //console.log('data logged: Time:', Date.now());
    next();
};

// Syntax to apply middleware function to the whole app
app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get("/", (req, res) => {
    res.send("Welcome to the website");
});

app.use("/person", personRoutes);
app.use("/menu",localAuthMiddleware, menuItemRoutes);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
