const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
require('dotenv').config();

// create express app
const app = express(); 

// Setup server port
const port = process.env.PORT || 4000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

// define a root/default route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to NodeApp!" });
});

app.use('/api/users', userRoutes);

// listen for requests
app.listen(port, () => {
    console.log(`Node server is listening on port ${port}`);
});