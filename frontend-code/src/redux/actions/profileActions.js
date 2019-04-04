import axios from 'axios';
import {GET_ERRORS, GET_USER_PROFILE, GET_ENROLLED_COURSES} from './types';
import setAuthToken from '../../utils/setAuthToken'


//Login Get User token
export const getCurrentProfile = () => dispatch => {
    // console.log(userData);

    axios
    .get('/api/profiles/')
    .then(res => {
        console.log(res);
        dispatch({
            type: GET_USER_PROFILE,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err)
        dispatch({
            type: GET_USER_PROFILE,
            payload: {}
        })
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    })  
}

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
    // console.log(profileData)
    axios
      .post('/api/profiles/edit', profileData)
      .then(res => {
          dispatch({
              type: GET_USER_PROFILE,
              payload: res.data
          })
          // history.push('/dashboard/profile')
        })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

// Get enrolled Courses
export const getEnrolledCourses = () => dispatch => {
  const token = localStorage.jwtToken
  //Set token to auth header
  setAuthToken(token);
  // console.log("getting enrolled courses")
  axios
      .get('/api/courses/getEnrolledCourses/')
      .then(res => 
            dispatch({
              type: GET_ENROLLED_COURSES,
              payload: res.data
          })
      )
      .catch(err => {
          console.log(err);
      })  
};
//   // Profile loading
//   export const setProfileLoading = () => {
//     return {
//       type: PROFILE_LOADING
//     };
//   };
  
//   // Clear profile
//   export const clearCurrentProfile = () => {
//     return {
//       type: CLEAR_CURRENT_PROFILE
//     };
//   };
  
