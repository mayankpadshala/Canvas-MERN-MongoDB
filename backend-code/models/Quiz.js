const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuizSchema = Schema({
    quizId:{
        type: String,
    },
    questions: [
        {
            quesition: {
                type: String
            },
            option1: {
                type: String
            },
            option2: {
                type: String
            },
            option3: {
                type: String
            },
            option4: {
                type: String
            },
            answer: {
                type: String
            },
            questionType: {
                type: String
            }
        }
    ],
    totalPoints: {
        type: Number
    },
    dueDate: {
        type: Date
    },
    info: {
        type: String
    }
    
})

const Quiz = mongoose.model('quizes', QuizSchema);

module.exports = Quiz;