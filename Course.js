const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    COURSE_ID: {
        type: String,
        required: true
    },
    COURSE_NAME: {
        type: String,
        required: true
    },
    DEPARTMENT: {
        type: String,
        required: true
    },
    DESCRIPTION: {
        type: String
    },
    COURSE_ROOM: {
        type: String
    },
    COURSE_CAPACITY: {
        type: String
    },
    WAITLIST_CAPACITY: {
        type: String
    },
    TERM: {
        type: String
    },
    WAITLIST_COUNTER: {
        type: String
    },
    CREATED_BY: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    ENROLLED_COUNTER: {
        type: String
    },
    STUDENTS_ENROLLED: [
        { type: mongoose.Schema.ObjectId, ref: 'User' }
    ],
    ASSIGNMENTS: [
        { type: mongoose.Schema.ObjectId, ref: 'Assignment' }
    ],
    ANNOUNCEMENTS : [
        {
            TITLE : String,
            DESCRIPTION : String,
            POSTED_DATE : Date
        }
    ],
    QUIZZES : [
        { type: mongoose.Schema.ObjectId, ref: 'Quiz' }
    ]
})

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;