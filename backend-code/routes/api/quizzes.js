const express = require('express');

const router = express.Router();

var cors = require('cors');
router.use(cors());

//Load User Model
const User = require('../../models/User');

//Load Profiles Model
const Course = require('../../models/Course');

//Load Assignment Model
const Assignment = require('../../models/Assignments');

//Load Quiz Model
const Quiz = require('../../models/Quiz')

//Import Validator Fields
const validateProfileInput = require('../../validation/profile');

const passport = require('passport');

//@route GET api/courses/test
//@desc Test Courses route
//@access Public
router.get('/test',  passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({msg: "Profile works!"})
})

//@route GET api/quiz/create
//@desc Test Courses route
//@access Public
router.post('/create', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log(req.body.data)

    const quizInfo = {
        quizId: req.body.data.quizId,
        courseId: req.body.data.courseId,
        createdBy: req.body.data.sjsuID,
        dueDate:req.body.data.dueDate,
        totalPoints:req.body.data.totalPoints
    }

    Quiz.findOne({
        quizId: req.body.data.quizId,
    })
    .then(quiz =>  {
        if(!quiz)
        {
            const newQuiz = new Quiz({
                quizId: req.body.data.quizId,
                dueDate:req.body.data.dueDate,
                totalPoints:req.body.data.totalPoints,
                info: req.body.data.instructions,
            })
            newQuiz.save()
            .then(q => {
                Course.findOne({
                    courseId: req.body.data.courseId
                })
                .then(course => {
                    console.log(q)
                    course.quizes.push({ quiz: q.id });
                    course.save().
                    then(c => {
                        Course.findOne({
                            courseId: req.body.data.courseId
                        })
                        .populate('quizes.quiz')
                        .exec((err, newCourse) => {
                            if(err)
                                throw err;
                            else
                            res.json({course : newCourse})
                        })
                    })
                })
            })
            .catch(error=> {
                res.json({error});
            })
        }
    })
})

//@route GET api/quiz/question/create
//@desc Test Courses route
//@access Public
router.post('/question/create', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log(req.body.data)
    Quiz.findOne({
        quizId : req.body.data.quizId
    })
    .then(quiz => {
        if(!quiz)
        {
            res.json({
                status : 'Quiz ID is not valid'
            })
        }
        else
        {
            let question = '';
            if(req.body.data.questionType == "Essay Question")
            {
                question = {
                    question : req.body.data.question,
                    answer: req.body.data.correctAnswer,
                    questionType: req.body.data.questionType
                }
            }
            else if(req.body.data.questionType == "Multiple Choice Question")
            {
                question = {
                    question : req.body.data.question,
                    option1 : req.body.data.option1,
                    option2 : req.body.data.option2,
                    option3 :req.body.data.option3,
                    option4 : req.body.data.option4,
                    answer : req.body.data.correctAnswer,
                    questionType : req.body.data.questionType
                }
            }
            console.log(question)
            quiz.questions.push(question);
            quiz.save()
            .then(q => {
                Course.findOne({
                    courseId : req.body.data.courseId
                })
                .populate('quizes.quiz')
                .exec((err, course) => {
                    if(err)
                        throw err;
                    else
                    res.json({course})
                })
            })
            .catch(err => {
                console.log(err);
            })
        }
    })
})

//@route GET api/quiz/getquizzes
//@desc Test Courses route
//@access Public
router.post('/getquizzes', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log(req.body)
    
    Course.findOne({
        courseId : req.body.data.courseId
    })
    .populate('quizes.quiz')
    .exec((err, course) => {
        if(err)
        {
            throw err;
        }
        else{
            console.log("__________________");
            console.log(course)
            if(course.quizes != null)
            {
                console.log(course.quizes);
                res.json({course});
            } else {

            }
        }
    })
})

router.post('/getAllQuestions', (req, res) => {
    console.log(req.body.data);
    Quiz.findOne({
        quizId: req.body.data.quizId
    })
    .then(quiz => {
        res.json({quiz});
    })
    .catch(error => {
        res.json({error});
    })
    
})

module.exports = router;