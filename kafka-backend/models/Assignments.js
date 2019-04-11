const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
    },
    totalPoints: {
        type: Number,
    },
    file: {
        type: String,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'courses',
    },
    submission: [
        {
            submitedBy: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
            file: {
                type: String,
            },
            submissoinNumber: {
                type: Number,
            },
            marks: {
                type: Number,
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
});

module.exports = Assignment = mongoose.model('assignments', AssignmentSchema);