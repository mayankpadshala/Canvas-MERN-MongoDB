import axios from 'axios';
import {GET_ERRORS} from './types';

//Register User
export const createCourse = (courseDetails , history ) => dispatch => {
    // console.log(courseDetails);

    axios
    .post('/api/courses/', courseDetails)
    .then(res => {
        console.log(res);
        history.push('/dashboard');
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })  
}


