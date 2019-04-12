import axios from 'axios/index';
import {GET_ERRORS, SET_SELECTED_COURSE, GET_COURSE_QUIZES, SET_SELECTION_COURSE, SET_COURSE_SECTION, DISPLAY_ASSIGNMENT, SUBMIT_ASSIGNMENT,GET_USER_PROFILE, SET_QUIZ_INDEX} from './types';
import setAuthToken from '../../utils/setAuthToken'

export function quizInfo(values) {
    return {
        type: GET_COURSE_QUIZES,
        payload: values
    }
  };

  export function questionInfo(values) {
    return { 
        type: "QUESTION_INFO", 
        payload : values
    }
  };

  export function questions(values) {
    return { 
        type: "QUESTIONS", 
        payload : values
    }
  };

export const createQuiz = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/api/quiz/create', {data})
        .then(response => {
            console.log(response);
            dispatch(quizInfo(response.data))
            const token = localStorage.jwtToken
            //Set token to auth header
            setAuthToken(token);
        })
    }
}

export const createQuestion = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/api/quiz/question/create', {data})
        .then(response => {
            console.log(response);
            dispatch(quizInfo(response.data))
            const token = localStorage.jwtToken
            //Set token to auth header
            setAuthToken(token);
        })
    }
}

export const getQuizzes = (data) => {
    console.log(data);
    return dispatch => {
         axios.post('/api/quiz/getquizzes', {data})
        .then(response => {
            console.log(response.data);
            dispatch(quizInfo(response.data.course.quizes))
            
            const token = localStorage.jwtToken
            //Set token to auth header
            setAuthToken(token);
            // return response.data
        })
    }
}

export const getQuestions = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/getAllQuestions', {data})
        .then(response => {
            console.log(response);
            dispatch(questions(response.data));
        })
    }
}

export const setQuizIndex = (quizIndex) => {
    return dispatch => {
        dispatch ({
            type: SET_QUIZ_INDEX,
            payload: quizIndex,
        })
    }
}