const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    handle: {
        type: String,
        max: 40,
    },
    phone: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    company: {
        type: String,
    },
    school: {
        type: String,
    },
    hometown: {
        type: String,
    },
    gender: {
        type: String,
    },
    language: {
        type: String,
    },
    bio: {
        type: String,
    },
    grade: [
        {
            assignment: {
                type: String,
            },
            grade: {
                type: String,
            }
        }
    ],
    submission: [
        {
            file: {
                type: String,
            },
            submissoinNumber: {
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

module.exports = Profile = mongoose.model('profile', ProfileSchema);