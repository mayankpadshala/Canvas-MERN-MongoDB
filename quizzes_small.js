var express = require('express');
var quizzes = express.Router();

// var cors = require('cors');
// quizzes.use(cors());

const Quiz = require('../models/Quiz');
const Course = require('../models/Course');

quizzes.post('/quiz/create', (req, res)=> {

    console.log(req.body.data)
    const quizInfo = {
        quizId: req.body.data.quizID,
        courseId: req.body.data.courseId,
        createdBy: req.body.data.sjsuID,
        dueDate:req.body.data.dueDate,
        totalPoints:req.body.data.totalPoints
    }

    Quiz.findOne({
        QUIZ_ID: req.body.data.quizID,
    })
    .then(quiz =>  {
        if(!quiz)
        {
            const newQuiz = new Quiz({
                QUIZ_ID: req.body.data.quizID,
                DUE_DATE:req.body.data.dueDate,
                TOTAL_POINTS:req.body.data.totalPoints,
                INFO: req.body.data.instructions,
            })
            newQuiz.save()
            .then(q => {
                Course.findOne({
                    COURSE_ID: req.body.data.courseId
                })
                .then(course => {
                    course.QUIZZES.push(q);
                    course.save().
                    then(c => {
                        Course.findOne({
                            COURSE_ID: req.body.data.courseId
                        })
                        .populate('QUIZZES')
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

quizzes.post('/quiz/question/create', (req,res) => {

    Quiz.findOne({
        QUIZ_ID : req.body.data.quizID
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
                    QUESTION : req.body.data.question,
                    ANSWER: req.body.data.correctAnswer,
                    QUESTION_TYPE: req.body.data.questionType
                }
            }
            else if(req.body.data.questionType == "Multiple Choice Question")
            {
                question = {
                    QUESTION : req.body.data.question,
                    OPTION1: req.body.data.option1,
                    OPTION2: req.body.data.option2,
                    OPTION3:req.body.data.option3,
                    OPTION4: req.body.data.option4,
                    ANSWER: req.body.data.correctAnswer,
                    QUESTION_TYPE: req.body.data.questionType
                }
            }
            
            quiz.QUESTIONS.push(question);
            quiz.save()
            .then(q => {
                Course.findOne({
                    COURSE_ID : req.body.data.courseId
                })
                .populate('QUIZZES')
                .exec((err, course) => {
                    if(err)
                        throw err;
                    else
                    res.json({course})
                })
            })
        }
    })
})


quizzes.post('/getquizzes', (req, res)=> {
    Course.findOne({
        COURSE_ID : req.body.data.courseId
    })
    .populate('QUIZZES')
    .exec((err, course) => {
        if(err)
        {
            throw err;
        }
        else{
            console.log("__________________");
            if(course.QUIZZES != null)
            {
                console.log(course.QUIZZES);
                res.json({course});
            }
        }
    })
})

quizzes.post('/getAllQuestions', (req, res) => {
    console.log(req.body.data);
    Quiz.findOne({
        QUIZ_ID: req.body.data.quizID
    })
    .then(quiz => {
        res.json({quiz});
    })
    .catch(error => {
        res.json({error});
    })
    
})

module.exports = quizzes;