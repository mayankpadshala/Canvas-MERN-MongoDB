import axios from 'axios/index';

export function quizInfo(values) {
    return { 
        type: "QUIZ_INFO", 
        payload : values
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
        return axios.post('/quiz/create', {data})
        .then(response => {
            console.log(response);
            dispatch(quizInfo(response.data));
        })
    }
}

export const createQuestion = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/quiz/question/create', {data})
        .then(response => {
            console.log(response);
            dispatch(questionInfo(response.data));
        })
    }
}

export const getQuizzes = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/getquizzes', {data})
        .then(response => {
            console.log(response);
            dispatch(quizInfo(response.data));
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