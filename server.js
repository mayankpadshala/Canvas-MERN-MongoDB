const express = require('express');

const app = express();

//in order to use req.body we need to get body-parser
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');
const courses = require('./routes/api/courses')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);
app.use('/api/courses', courses);

// // Using session for auth
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
//Import passport for authentication
const passport = require('passport');


var cors = require('cors');
app.use(cors());

//DB Config
const db = require('./config/keys').mongoURI;


//Connect to Mongo Db
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Mongo Db Connected'))
    .catch((err) => console.log(err))

//Use Routes


// const sessioSecret = require('./config/keys').sessioSecret;

// Passport does not directly manage your session, it only uses the session.
// So you configure session attributes (e.g. life of your session) via express
// var sessionOpts = {
//     saveUninitialized: true, // saved new sessions
//     resave: false, // do not automatically write to the session store
//     // store: sessionStore, 
//     secret: sessioSecret,
//     cookie : { httpOnly: true, maxAge: 2419200000 } // configure when sessions expires
// }

// app.use(cookieParser(sessioSecret))
// app.use(session(sessionOpts))

app.use(passport.initialize())
// app.use(passport.session())

//Passport config(strategy) here jwt strategy
require('./config/passport')(passport);

app.get('/', (req, res) => {res.send('Hello')})

const port = process.env.PORT || 5000;

app.listen(port, ()=> {console.log(`Server running on port ${port}`)})