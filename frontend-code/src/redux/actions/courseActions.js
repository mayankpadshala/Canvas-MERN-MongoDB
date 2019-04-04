import axios from 'axios';
import {GET_ERRORS, SET_SELECTED_COURSE} from './types';
import setAuthToken from '../../utils/setAuthToken'

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

//Get the course
export const getCourse = (courseid) => dispatch => {

    const token = localStorage.jwtToken
    //Set token to auth header
    setAuthToken(token);

    // console.log(courseid);

    axios
    .post('/api/courses/getCourse', {id : courseid})
    .then(response => {
        dispatch({
            type: SET_SELECTED_COURSE,
            payload: response.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

