const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateLoginInput(data) {
    let errors = {};

    data.sjsuId = !isEmpty(data.sjsuId) ? data.sjsuId : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    
    if(Validator.isEmpty(data.sjsuId)) {
        errors.sjsuId = "SJSU ID is required";
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors, 
        isValid: isEmpty(errors),
    }
}