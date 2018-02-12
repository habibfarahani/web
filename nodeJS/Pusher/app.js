const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// DB Config
require('./config/db');

const app = express();

const poll = require('./routes/poll');

// Public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable cors
app.use(cors());

// anything in poll folder is directed to poll
app.use('/poll', poll);

const port = 3000;

//Start server

app.listen(port, () => console.log('server started on port', port));