import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from 'jwt-decode';
import {GET_ERRORS, SET_CURRENT_USER} from './types';

//Register User
export const registerUser = (userData , history ) => dispatch => {
    // console.log(userData);

    axios
    .post('/api/users/register', userData)
    .then(res => history.push('/'))
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })  
}

//Login Get User token
export const loginUser = (userData , history ) => dispatch => {
    // console.log(userData);

    axios
    .post('/api/users/login', userData)
    .then(res => {
        //Save to local Storage
        const {token} = res.data;

        //Set token to local Storage
        localStorage.setItem('jwtToken', token);

        //Set token to auth header
        setAuthToken(token);

        //Decode Token to get user data
        const decoded = jwt_decode(token);

        //Set Current User
        dispatch(setCurrentUser(decoded));

        history.push('/dashboard')
    })
    .catch(err => {
        console.log(err)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })  
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };

//Set logged in user
export const setCurrentUser = decoded => {
    return {
        type : SET_CURRENT_USER,
        payload: decoded,
    }
}


