const express = require('express');

const router = express.Router();

var cors = require('cors');
router.use(cors());

//@route GET api/posts/test
//@desc Test Posts route
//@access Public
router.get('/test', (res, req) => {
    res.json({msg: "Posts works!"})
})

module.exports = router;