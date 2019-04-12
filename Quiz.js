const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    QUIZ_ID:{
        type: String,
    },
    QUESTIONS: [
        {
            QUESTION: {
                type: String
            },
            OPTION1: {
                type: String
            },
            OPTION2: {
                type: String
            },
            OPTION3: {
                type: String
            },
            OPTION4: {
                type: String
            },
            ANSWER: {
                type: String
            },
            QUESTION_TYPE: {
                type: String
            }
        }
    ],
    TOTAL_POINTS: {
        type: Number
    },
    DUE_DATE: {
        type: Date
    },
    INFO: {
        type: String
    }
    
})

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;