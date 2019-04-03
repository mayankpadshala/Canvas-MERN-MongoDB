const express = require('express');

const users = express.Router();

const cors = require('cors');

const jwt = require('jsonwebtoken');

const keys = require('../config/keys')

const User = require('../models/User');
users.use(cors());

//Register a User
users.post('/register', (req, res) => {
    //Get the data and store it

    const { body } = req;
    const {
        sjsuid,
        password,
        flag,
        fname,
        lname,
        email,
        phone,
    } = body;

    User.findOne({
        where: {
            sjsuid : sjsuid
        }
    })
    .then((err, previousUser) => {
        if(err) {
            res.json({
                success: false,
                message: "Error in Server"
            })
        } else if(!previousUser) {
            const newUser = new User();

            newUser.sjsuid = sjsuid;
            newUser.password = newUser.generateHash(password);
            newUser.flag = flag;
            newUser.fname = fname;
            newUser.lname = lname;
            newUser.email = email;
            newUser.phone = phone;

            newUser.save((err, newuser) => {
                if(err) {
                    res.json({
                        success: false,
                        message: "Error in creating new User"
                    })
                }

                res.json({
                    success: true,
                    message: "Signed Up Successfully"
                })

            })

        } else {
            res.json({error : "User already exist"});
        }
    })
    .catch(err => {
        res.json({
            success: false,
            message: "Database Error."
        })
    })
})

//Login User
users.post('/login', (req, res) => {
    //Get the data and store it

    const { body } = req;
    const {
        sjsuid,
        password,
    } = body;

    User.findOne({
        sjsuid
    })
    .then(user => {
        if(user){
            var result = user.validPassword(password);
            if(result) {
                const payload = {
                    id: user.id,
                    sjsuid: user.sjsuid
                }
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                      expiresIn: 43200 // 1 year in seconds
                    },
                    (err, token) => {
                      res.json({
                        success: true,
                        message: "Logged In Successfully",
                        token: token,
                      });
                    }
                  );
            } else {
                res.json({
                    success: false,
                    message: "Logged In UnSuccessfully"
                })
            }
        } else {
            
            res.json({
                success: false,
                message: "Unsuccessfull Logged In UnSuccessfully"
            })
        }
    })
    .catch((err) => {
        res.json({
        success: false,
        message: "DB error!",
        error: 'err',
        }
    )})
})


module.exports = users