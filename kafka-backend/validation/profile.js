const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateProfileInput(data) {
    let errors = {};

    // data.handle = !isEmpty(data.handle) ? data.handle : "";

    // if(!Validator.isLength(data.handle, {min: 2, max: 40})){
    //     errors.handle = "Handle must be between two and thirty characters";
    // }

    // if(Validator.isEmpty(data.handle)) {
    //     errors.handle = "Handle is required";
    // }


    return {
        errors, 
        isValid: isEmpty(errors),
    }
}