const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initiate App
const app = express();

// Connect to Database
const db = require('./config/dbkey').mongoURI

mongoose
    .connect(db)
    .then(() => console.log('Connected MongoDB Atlas!!'))
    .catch(err => console.log(err));

// Body Parser Middleware
app.use(bodyParser.json())

// Dot Env Configutation
require('dotenv').config();

// Route Files
let authenticate = require('./routes/authenticate');
let loads = require('./routes/loads');
let messages = require('./routes/messages');
app.use('/authenticate', authenticate);
app.use('/loads', loads);
app.use('/messages', messages);

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}!!!`));
