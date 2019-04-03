const express = require('express');

const mongoose = require('mongoose');

const app = express();

var cors = require('cors');
app.use(cors());

//Body Parser Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Mongodb URI || DB config
const db = require('./config/keys').mongoURI;

//connect to mongo
mongoose
    .connect(db , { useNewUrlParser: true })
    .then(() => {console.log("mongoDB is connected successfully")})
    .catch((err) => {console.log(err)})

var morgan = require('morgan');
var passport = require('passport');
var jwt = require('jsonwebtoken');

// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Log requests to console
app.use(morgan('dev'));

// API endpoints
var Users = require('./routes/Users');
app.use('/users', Users);

const port = process.env.PORT || 9000

app.listen(port, () => console.log(`Server started on port ${port}`));