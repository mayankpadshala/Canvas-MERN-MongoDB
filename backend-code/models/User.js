const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    sjsuid: {
        type: String,
        resuired: true,
    },
    password: {
        type: String,
        resuired: true,
    },
    flag: {
        type: Boolean,
        default: false,
        resuired: true,
    },
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    school: {
        type: String,
    },
    gender: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    hometown: {
        type: String,
    },
    company: {
        type: String,
    },
    language: {
        type: String,
    },
    bio: {
        type: String,
    },
    profileImg: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = User = mongoose.model('users', UserSchema);