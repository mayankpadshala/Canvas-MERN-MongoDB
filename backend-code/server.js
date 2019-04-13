const express = require('express');

const app = express();

var cors = require('cors');
app.use(cors());

//in order to use req.body we need to get body-parser
const bodyParser = require('body-parser');

app.use(express.static('./public'))

const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');
const courses = require('./routes/api/courses')
const files = require('./routes/api/fileHandling')
const quiz = require('./routes/api/quizzes')
const messages = require('./routes/api/messages')

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://52.8.7.74:3000', credentials: true }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://52.8.7.74:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);
app.use('/api/courses', courses);
app.use('/api/files', files);
app.use('/api/quiz', quiz);
app.use('/api/messages', messages);

// // Using session for auth
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
//Import passport for authentication
const passport = require('passport');

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