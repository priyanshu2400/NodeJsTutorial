const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotel';

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error(`Error connecting to MongoDB server: ${err}`);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB server');
});


module.exports = db;
