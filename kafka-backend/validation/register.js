const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.fname = !isEmpty(data.fname) ? data.fname : '';
    data.lname = !isEmpty(data.lname) ? data.lname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(!Validator.isLength(data.fname, {min: 2, max: 20})){
        errors.fname = "Name must be between two and twenty characters";
    }

    if(Validator.isEmpty(data.fname)) {
        errors.fname = "First Name field is required";
    }

    if(!Validator.isLength(data.lname, {min: 2, max: 20})){
        errors.lname = "Name must be between two and twenty characters";
    }

    if(Validator.isEmpty(data.lname)) {
        errors.lname = "Last Name field is required";
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = "Email field is Invalid";
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "Password must be atleast 6 characters";
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors, 
        isValid: isEmpty(errors)
    };
}