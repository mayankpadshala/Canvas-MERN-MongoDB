const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    sjsuId: {
        type: String,
        required: true
    },
    faculty: {
        type: Boolean,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    coursesEnrolled: [
        {
          course: {
            type: Schema.Types.ObjectId,
            ref: 'courses'
          }
        }
      ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);