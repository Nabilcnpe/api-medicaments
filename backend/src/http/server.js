const express = require('express');
const app = express();

const api = require('./api/api');
const { dbConnect } = require('../../db');

//DB
dbConnect();

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.use('/api', api);

//A MIDDLEWARE ERROR HANDLER
app.use((err, req, res, next) => {
    console.log('This is the error :', err.stack);
    res.status(500);
});

module.exports = app;
