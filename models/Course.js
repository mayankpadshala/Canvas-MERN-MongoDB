const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    courseRoom: {
        type: String
    },
    courseCapacity: {
        type: Number
    },
    waitlistCapacity: {
        type: Number
    },
    term: {
        type: String
    },
    waitlistCounter: {
        type: Number
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    enrolledCounter: {
        type: Number
    },
    studentsEnrolled: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Course = mongoose.model('courses', CourseSchema);