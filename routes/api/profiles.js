const express = require('express');

const router = express.Router();

var cors = require('cors');
router.use(cors());

//Load User Model
const User = require('../../models/User');

//Load Profiles Model
const Profile = require('../../models/Profile');

//Import Validator Fields
const validateProfileInput = require('../../validation/profile');

const passport = require('passport');

//@route GET api/profiles/test
//@desc Test Profiles route
//@access Public
router.get('/test', (req, res) => {
    res.json({msg: "Profile works!"})
})


//@route GET api/profiles/all
//@desc Get all profile
//@access Public
router.get('/all', (req, res) => {
    const errors = {}

    Profile.find()
    .populate('user', ['fname', 'lname', 'email', 'sjsuId', 'avatar'])
    .then(profiles => {
        if(!profiles) {
            errors.noprofile = "There are no profiles";
            res.status(404).json(errors);
        }

        res.json(profiles);
    })
    .catch(err => {
        res.status(404).json(err);
    })
});

//@route GET api/profiles/handle/:handle
//@desc Get profile by handle
//@access Public
router.get('/handle/:handle', (req, res) => {
    const errors = {}

    Profile.findOne({handle: req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = "There is no profile for this user";
            res.status(404).json(errors);
        }

        res.json(profile);
    })
    .catch(err => {
        res.status(404).json(err);
    })
});

//@route GET api/profiles/user/:user_id
//@desc Get profile by user
//@access Private
router.get('/user/:user_id', passport.authenticate('jwt', {session: false}),(req, res) => {
    const errors = {}

    Profile.findOne({handle: req.params.user_id})
    .populate('user', ['fname', 'lname', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = "There is no profile for this user";
            res.status(404).json(errors);
        }

        res.json(profile);
    })
    .catch(err => {
        res.status(404).json({profile : "There is no profile for this user"});
    })
});

//@route GET api/profiles
//@desc Get current users profile
//@access Private
router.get('/', passport.authenticate('jwt', {session: false}),(req, res) => {
    const errors = {}

    Profile.findOne({user : req.user.id})
    .populate('user', ['fname', 'lname', 'email', 'sjsuId', 'avatar'])
    .then(profile => {
        console.log(profile)
        if(!profile) {
            errors.noprofile = "There is no profile for this user"
            return res.status(404).json(errors);
        }
        res.json(profile)
    })
    .catch(err => {
        res.status(404).json(err)
    })
})

//@route POST api/profiles
//@desc Create profile or update the profile
//@access Private
router.post('/', passport.authenticate('jwt', {session: false}),(req, res) => {
    const {errors, isValid} = validateProfileInput(req.body);

    //Check Validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const profileFields = {};

    console.log(req.body);

     profileFields.user = req.user.id;
     profileFields.handle = req.body.handle;
     profileFields.phone = req.body.phone;
     profileFields.city = req.body.city;
     profileFields.country = req.body.country;
     profileFields.company = req.body.company;
     profileFields.school = req.body.school;
     profileFields.hometown = req.body.hometown;
     profileFields.gender = req.body.gender;
     profileFields.language = req.body.language;
     profileFields.bio = req.body.bio;
    

    Profile.findOne({user : req.user.id})
    .then(profile => {
        if(profile) {
            //Update
            // console.log("In Update")
            Profile.findOneAndUpdate(
                {user: req.user.id}, 
                {$set: profileFields}, 
                {new: true}
            ).then(profile => res.json(profile));
        } else {
            //Create --

            //Save Profile
            new Profile(profileFields).save()
            .then(profile => {
                res.json(profile);
            })
        }
    })

})


module.exports = router;