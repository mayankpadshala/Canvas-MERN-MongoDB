const express = require('express');

const router = express.Router();

//in order to use req.body we need to get body-parser
const bodyParser = require('body-parser');


const mongoose = require('mongoose');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))


//Load User Model
const User = require('../models/User');

//Importing gravatar for user registration
const gravatar = require('gravatar');

//Importing Bcrypt to encrypt password
const bcrypt = require('bcryptjs')

//Import jwt for login
const jwt = require('jsonwebtoken');

//Import keys for jwt token secret key
const secretOrKey = require('../config/keys').secretOrKey;

//Create a protected route using passport
const passport = require('passport');

//Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

//@route GET api/users/test
//@desc Test Users route
//@access Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));


//@route GET api/users/register
//@desc Register a User route
//@access Public
router.post('/register', (req, res) => {
    // console.log(req.body)
    const {errors, isValid} = validateRegisterInput(req.body);

    console.log(isValid)

    // Check Validation
    if(!isValid) {
        errors.invalid = "Invalid Something"
        return res.status(400).json(errors);
    }

    User.findOne({ sjsuId: req.body.sjsuId }).then(user => {
        if(user){
            errors.sjsuId = "SJSU ID already exists"
            return res.status(400).json(errors)
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', //Size
                r: 'pg', //Rating
                d: 'mm', //Default
            })

            const newUser = new User({
                sjsuId: req.body.sjsuId,
                faculty: req.body.faculty,
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                avatar: avatar, //only avatar also works
                password: req.body.password,
            });

            //Generate a salt that can be used to has password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err){
                        throw err;
                    }
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => {
                        // console.log("New User Created");
                        res.json(user)
                    })
                    .catch(err => {
                        console.log('error in password hash')
                        res.json(err)
                    })
                })
            })

        }
    })
})

//@route GET api/users/login
//@desc Login a User /Retunr token (jwt)
//@access Public
function handle_request(msg, callback){

    const {errors, isValid} = validateLoginInput(msg);

    // console.log("In handle request:"+ JSON.stringify(msg));

            // Check Validation
            if(!isValid) {
                // console.log("In is Valid")
                callback(null, errors);
            }

            const sjsuId = msg.sjsuId;
            const password = msg.password;
            
            // console.log(sjsuId)

            //Find user by email
            User.findOne({sjsuId : msg.sjsuId})
            .then(user => {
                console.log(user)
                if(!user) {
                    errors.sjsuId = "User not found";
                    callback(null, errors);
                }

                //Check Password
                bcrypt.compare(password, user.password).then(isMatch => {
                    if(isMatch){
                        // res.json({msg: "Success"})
                        //User matched

                        const payload = { id : user.id, fname: user.fname, lname: user.lname,email: user.email, sjsuId: user.sjsuId, avatar: user.avatar, faculty: user.faculty, RECEIVED_MESSAGES : user.RECEIVED_MESSAGES } //Create jwt payload to send with jwt token

                        //Sign token take in two parameters first is the payload that we created above and the secret key
                        jwt.sign(payload, secretOrKey, {expiresIn: 8*3600}, (err, token) => {

                            data = {
                                success: true,
                                token: "Bearer " + token
                              };

                            callback(null, data );
                        });

                    } else {
                        errors.password = "Password Incorrect";
                        callback(null,errors );
                    }
                })

            })
            .catch(err => {
                callback(null,err );
            })
    }

//@route GET api/users/current
//@desc Return current user
//@access Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    // console.log(req.cookie);
    // console.log("================================");
    // console.log(req.session);
    res.json({
        id: req.user.id,
        fname: req.user.fname,
        lname: req.user.lname,
        email: req.user.email
    });
});


exports.handle_request = handle_request;