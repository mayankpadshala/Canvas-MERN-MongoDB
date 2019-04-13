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
      
    marks: [
        {
          name: {
              type: String
          },
          marksObtained: {
              type: Number
          },
          totalMarks: {
              type: Number
          }
        }
      ],
    RECEIVED_MESSAGES:[
        {
            MESSAGE: String,
            Date: Date,
            FROM: String,
            FROM_SJSUID: String,
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);