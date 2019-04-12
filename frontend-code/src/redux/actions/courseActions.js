import axios from 'axios';
import {GET_ERRORS, SET_SELECTED_COURSE, SET_SELECTION_COURSE, SET_COURSE_SECTION, DISPLAY_ASSIGNMENT, SUBMIT_ASSIGNMENT,GET_USER_PROFILE, SET_USER_GRADES} from './types';
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

//Get Selected Course and set it on redux
export const getSelectedCourse = (courseid, history) => dispatch => {
    dispatch({
        type: SET_SELECTION_COURSE,
        payload: courseid
    })
    history.push('/dashboard/courses/assignments');
}

//Get the course Selection and set it on store
export const courseSection = (section, history) => dispatch =>{
    dispatch({
        type: SET_COURSE_SECTION,
        payload: section
    })
    history.push(`/dashboard/courses/${section}`);
}
//Upload New Assignment
export const uploadAssignment = (fd, history) => dispatch => {
  
    axios
    .post('/api/files/uploadAssignment', fd)
    .then(res => {
        console.log(res);
    })
    
    const token = localStorage.jwtToken
    //Set token to auth header
    setAuthToken(token);

    history.push('/dashboard/courses/assignments/')
  } 

//Display the selected Assignment
export const displayAssignment = (id, history) => dispatch =>{
    
    axios
    .post('/api/courses/displayAssignment', {id})
    .then(res => {
        
        dispatch({
            type: SET_COURSE_SECTION,
            payload: 'viewAssignments'
        })
        history.push('/dashboard/courses/viewAssignments')

        dispatch({
            type: DISPLAY_ASSIGNMENT,
            payload: res.data
        })
    })

}

//Display the selected Assignment
export const submitAssignment = (id, history) => dispatch =>{
    dispatch({
        type: SET_COURSE_SECTION,
        payload: 'submitAssignments'
    })
    history.push(`/dashboard/courses/submitAssignments`);
    dispatch({
        type: SUBMIT_ASSIGNMENT,
        payload: id
    })
}

//Display the selected Assignment
export const deleteAssignment = (id, courseId, history) => dispatch =>{
    axios
    .post('/api/courses/deleteAssignment', {id : id, courseId: courseId})
    .then(res => {
        dispatch({
            type: SET_SELECTED_COURSE,
            payload: res.data
        })
    })
}

export const displaySubmissions = (assignmentId, courseId, history) => dispatch => {
    

    axios
    .post('/api/courses/displayAssignment', {id: assignmentId})
    .then(res => {
        dispatch({
        type: DISPLAY_ASSIGNMENT,
        payload: res.data
        })
        dispatch({
            type: SET_COURSE_SECTION,
            payload: 'displaySubmissions'
        })
        history.push(`/dashboard/courses/displaySubmissions`);
    })

    const token = localStorage.jwtToken
    //Set token to auth header
    setAuthToken(token);

}

export const submitUploadAssignment = (fd, history) => dispatch => {

    axios
    .post('/api/files/uploadAssignmentSubmission', fd)
    .then(res => {
        dispatch({
            type: GET_USER_PROFILE,
            payload: res.data
        })
    })

    
    dispatch({
        type: SET_COURSE_SECTION,
        payload: 'assignments'
    })
    history.push('/dashboard/courses/assignments/');

    const token = localStorage.jwtToken
    //Set token to auth header
    setAuthToken(token);    
    
}

export const updateMarks = (assignId, submissionNumber, marks) => dispatch => {
    // console.log(marks);
    axios
    .post('/api/courses/updateMarks', {
        assignId: assignId,
        submissionNumber: submissionNumber,
        marks: marks        
    })
    .then(res => {
        dispatch({
            type: DISPLAY_ASSIGNMENT,
            payload: res.data
        })
    })

}
  
export const createAnncouncement = (courseId, title, description) => dispatch => {
    axios
    .post('/api/courses/createAnnouncement', {courseId, title, description})
    .then(res => {
        dispatch({
            type: SET_SELECTED_COURSE,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err)
    })

    const token = localStorage.jwtToken
    //Set token to auth header
    setAuthToken(token);
}

export const deleteAnnouncement = (courseId, announcementId) => dispatch => {
    axios
    .post('/api/courses/deleteAnnouncement', {courseId, announcementId})
    .then(res => {
        dispatch({
            type: SET_SELECTED_COURSE,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err)
    })

    const token = localStorage.jwtToken
    //Set token to auth header
    setAuthToken(token);
}

export const setGrades = () => dispatch => {
    axios
    .get('/api/users/getGrades')
    .then(res => {
        // console.log(res);
        dispatch({
            type: SET_USER_GRADES,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err)
    })

    const token = localStorage.jwtToken
    //Set token to auth header
    setAuthToken(token);
}