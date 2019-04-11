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
    assignments: [
        {
            assignment: {
                type: Schema.Types.ObjectId,
                ref: 'assignments',
            }
        }
    ],
    announcement: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Course = mongoose.model('courses', CourseSchema);