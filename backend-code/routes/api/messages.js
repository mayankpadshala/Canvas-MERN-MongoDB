var express = require('express');
var router = express.Router();

var cors = require('cors');
router.use(cors());

var datetime = require('node-datetime');

const User = require('../../models/User');

const passport = require('passport');

//@route GET api/messages/send/message
//@desc Test Posts route
//@access Public
router.post('/send/message', passport.authenticate('jwt', {session: false}),(req, res) => {

    console.log(req.body)

    console.log(req.user)

    var currentTime = datetime.create();
    var saveTime = new Date(currentTime.getTime());

    var fromName = req.user.fname + " " + req.user.lname

    User.findById(req.body.sendTo)
    .then(user => {
        const msg = {
            MESSAGE: req.body.message,
            Date: saveTime,
            FROM: fromName,
            FROM_SJSUID: req.user.sjsuId
        }
        user.RECEIVED_MESSAGES.push(msg);
        user.save()
        .then(upUser => {
            res.json({user:upUser})
        })
        .catch(error => {
            res.json({error});
        })
    })

})

//@route GET api/messages/send/messageInbox
//@desc Test Posts route
//@access Public
router.post('/send/messageInbox', passport.authenticate('jwt', {session: false}),(req, res) => {

    console.log(req.body)

    // console.log(req.user)

    var currentTime = datetime.create();
    var saveTime = new Date(currentTime.getTime());

    var fromName = req.user.fname + " " + req.user.lname

    User.findOne({sjsuId : req.body.sendTo})
    .then(user => {
        const msg = {
            MESSAGE: req.body.message,
            Date: saveTime,
            FROM: fromName,
            FROM_SJSUID: req.user.sjsuId
        }
        user.RECEIVED_MESSAGES.push(msg);
        user.save()
        .then(upUser => {
            res.json({user:upUser})
        })
        .catch(error => {
            res.json({error});
        })
    })

})




module.exports = router;