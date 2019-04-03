const express = require('express');

const router = express.Router();

var cors = require('cors');
router.use(cors());

//Load User Model
const User = require('../../models/User');

//Load Profiles Model
const Course = require('../../models/Course');

//Import Validator Fields
const validateProfileInput = require('../../validation/profile');

const passport = require('passport');

//@route GET api/courses/test
//@desc Test Courses route
//@access Public
router.get('/test',  passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({msg: "Profile works!"})
})


//@route POST api/courses
//@desc Create course or update the course
//@access Private
router.post('/', passport.authenticate('jwt', {session: false}),(req, res) => {

    const courseFields = {};

    // console.log(req.body);
    // console.log(req.user);

     courseFields.courseId = req.body.courseId;
     courseFields.courseName = req.body.courseName;
     courseFields.department = req.body.department;
     courseFields.description = req.body.description;
     courseFields.courseRoom = req.body.courseRoom;
     courseFields.courseCapacity = req.body.courseCapacity;
     courseFields.waitlistCapacity = req.body.waitlistCapacity;
     courseFields.term = req.body.term;
     courseFields.createdBy = req.user.id
    

    Course.findOne({courseId : req.body.courseId})
    .then(course => {
        if(course) {
            //Update
            // console.log("In Update")
            Course.findOneAndUpdate(
                {createdBy: req.user.id}, 
                {$set: courseFields}, 
                {new: true}
            ).then(course => res.json(course));
        } else {
            //Create --

            //Save Profile
            new Course(courseFields).save()
            .then(course => {
                res.json(course);
                // Enroll the user in course and vice versa
                Course.findById(course.id)
                .then(course => {

                    // Add user id to studentsEnrolled array
                    course.studentsEnrolled.unshift({ user: req.user.id });

                    course.save().then(course => {
                        console.log('Course updated with added user')
                        console.log('==========================================================');
                        console.log(course)
                    });

                    // Add the course to courses Enrolled in users schema
                    User.findById(req.user.id)
                    .then(user => {
                        
                        user.coursesEnrolled.unshift({ course: course.id });

                        user.save().then(user => {
                            console.log('User updated with added courses')
                            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
                            console.log(user)
                        });
                    })
                    .catch(err => console.log(err));
                    
                })
                .catch(err => res.status(404).json({ coursenotfound: 'No Course found' }));
            })
        }
    })

})

//@route POST api/courses/enroll/
//@desc Enroll a course
//@access Private
router.post('/enroll', passport.authenticate('jwt', {session: false}),(req, res) => {

    // console.log(req.body.id);
    // console.log(req.user);    

    Course.findById(req.body.id)
    .then(course => {
        // console.log(course)
        if (
        course.studentsEnrolled.filter(student => student.user.toString() === req.user.id)
            .length > 0
        ) {
        return res
            .status(400)
            .json({ alreadyEnrolled: 'User has already Enrolled this course' });
        }
        
        // Add the course to courses Enrolled in users schema
        User.findById(req.user.id)
        .then(user => {
            // console.log(user)
            if (
                user.coursesEnrolled.filter(student => student.course.toString() === req.body.id)
                    .length > 0
                ) {
                return res
                    .status(400)
                    .json({ alreadyEnrolledUser: 'User has already Enrolled this course' });
                }

            // Add user id to studentsEnrolled array
            user.coursesEnrolled.unshift({ course: req.body.id });

            user.save().then(user => {
                console.log('User updated with added courses')
                console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
                console.log(user)
            });
        })

        // Add user id to studentsEnrolled array
        course.studentsEnrolled.unshift({ user: req.user.id });

        course.save().then(course => {
            console.log('Course updated with added user')
            console.log('==========================================================');
            console.log(course)
        });

        
        // res.status(200).json({Success : "Successully updated user and course"})
        

    })
    .catch(err => res.status(404).json({ coursenotfound: 'No Course found' }));

})

//@route POST api/courses/unenroll/
//@desc Un Enroll a course
//@access Private
router.post('/unenroll', passport.authenticate('jwt', {session: false}),(req, res) => {

    // console.log(req.body.id);
    // console.log(req.user);    
   
    Course.findById(req.body.id)
    .then(course => {
        if (
        course.studentsEnrolled.filter(student => student.user.toString() === req.user.id)
            .length === 0
        ) {
        return res
            .status(400)
            .json({ notEnrolled: 'You have not yet Enrolled in this course' });
        }

                User.findById(req.user.id)
                .then(user => {
                    console.log(user)
                    if (
                        user.coursesEnrolled.filter(student => student.course.toString() === req.body.id)
                            .length === 0
                        ) {
                        return res
                            .status(400)
                            .json({ notEnrolledUser: 'User have not yet Enrolled in this course' });
                        }

                    // Get remove index
                    const removeIndex = user.coursesEnrolled
                    .map(item => item.course.toString())
                    .indexOf(req.body.id);

                    // Splice out of array
                    user.coursesEnrolled.splice(removeIndex, 1);

                    // Save
                    user.save().then(user => {        
                        console.log('User updated with removed course')
                        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
                        console.log(user)
                    });
                })

        // Get remove index
        const removeIndex = course.studentsEnrolled
        .map(item => item.user.toString())
        .indexOf(req.user.id);

        // Splice out of array
        course.studentsEnrolled.splice(removeIndex, 1);

        // Save
        course.save().then(course => {
            console.log('Course updated with removed user')
            console.log('==========================================================');
            console.log(course)
        });

    })
    .catch(err => res.status(404).json({ coursenotfound: 'No Course found' }));

})

//@route POST api/courses/getEnrolledCourses/
//@desc Get enrolled courses for a partcular user
//@access Private
router.get('/getEnrolledCourses', passport.authenticate('jwt', {session: false}),(req, res) => {

    // console.log(req.user.id);
    // console.log(req.user);
        

    User.findById(req.user.id)
    .populate('coursesEnrolled.course')
    .then(user => {
        // console.log(user);
        // user.coursesEnrolled.map(key => {
        //     // console.log(key);
        //     console.log("--------")
        //     console.log(key.course);
        //     // console.log(user.coursesEnrolled[key])
        // })
        res.json(user.coursesEnrolled)
    })
    .catch(err => res.status(404).json({ coursenotfound: 'No Course found' }));

})

//@route POST api/courses/getEnrolledCourses/
//@desc Get enrolled courses for a partcular user
//@access Private
router.get('/getEnrolledUsers', passport.authenticate('jwt', {session: false}),(req, res) => {

    // console.log(req.user.id);
    // console.log(req.user);
    


    Course.findById(req.body.id)
    .populate('studentsEnrolled.user')
    .then(course => {
        console.log(course)
        res.json(course.studentsEnrolled)
    })
    .catch(err => res.status(404).json({ coursenotfound: 'No Course found' }));

})

//@route POST api/courses/getBycourseId/
//@desc Get courses by dearch Criteria of find by Id
//@access Private
router.post('/getBycourseId',passport.authenticate('jwt', {session: false}),(req, res) => {
    console.log(req.body)
    if(req.body.courseFilter === 'is exactly') {
        Course.find({courseId: req.body.courseId})
        .then(course => {
            res.json(course)
        })

    } else if(req.body.courseFilter === 'greater than or equal to') {
        Course.find({
            courseId: { $gt : req.body.courseId - 1}
        })
        .then(courses => {
            // console.log(courses)
            res.json(courses)
        })
    } else if(req.body.courseFilter === 'less than or eqaul to') {
        Course.find({
            courseId: { $lt : req.body.courseId + 1}
        })
        .then(courses => {
            // console.log(courses)
            res.json(courses)
        })
    } else {

    }
})

//@route POST api/courses/getBycourseTerm/
//@desc Get courses by search Criteria of find by term
//@access Private
router.post('/getBycourseTerm',passport.authenticate('jwt', {session: false}),(req, res) => {
    
        Course.find({term: req.body.term})
        .then(course => {
            res.json(course)
        })

    
})

//@route POST api/courses/getBycourseName/
//@desc Get courses by search Criteria of find by courseName
//@access Private
router.post('/getBycourseName',passport.authenticate('jwt', {session: false}),(req, res) => {
    
    Course.find({courseName: req.body.courseName})
    .then(course => {
        res.json(course)
    })


})

module.exports = router;