import { SET_SELECTED_COURSE, GET_COURSE_QUIZES, SET_SELECTION_COURSE, SET_COURSE_SECTION, DISPLAY_ASSIGNMENT, SUBMIT_ASSIGNMENT, SET_QUIZ_INDEX, SET_USER_GRADES } from '../actions/types'

const initialState = {
    selectedCourse: null,
    courseClicked: null,
    assignmentDisplayed: null,
    quizzes: null,
    errorMessage: '',
    quizIndex: null,
    grades: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        
        case SET_SELECTED_COURSE : 
        return {
            ...state,
            selectedCourse: action.payload
        }
        case SET_SELECTION_COURSE : 
        return {
            ...state,
            courseClicked: action.payload
        }
        case SET_COURSE_SECTION : 
        return {
            ...state,
            courseSection: action.payload
        }
        case DISPLAY_ASSIGNMENT :
        return {
            ...state,
            assignmentDisplayed : action.payload
        }
        case SUBMIT_ASSIGNMENT :
        return {
            ...state,
            submittingAssignment : action.payload
        }
        case GET_COURSE_QUIZES : 
        return {
            ...state,
            quizzes: action.payload
        }

        case SET_QUIZ_INDEX : {
            return {
                ...state,
                quizIndex: action.payload
            }
        }
        case SET_USER_GRADES : {
            return {
                ...state,
                grades: action.payload
            }
        }
        case "QUIZ_INFO" : 
            console.log(action.payload);
            if(action.payload.course)
            {
                state = {
                    ...state,
                    quizzes : action.payload.course.quizes,
                    errorMessage : ''
                }
            }
            else
            {
                state = {
                    ...state,
                    errorMessage : action.payload.error.message,
                }
            }
            break; 

        case "QUESTION_INFO" : 
            console.log(action.payload);
            if(action.payload.course)
            {
                state = {
                    ...state,
                    quizzes : action.payload.course.QUIZZES,
                    errorMessage : ''
                }
            }
            else
            {
                state = {
                    ...state,
                    errorMessage : action.payload.status,
                }
            }
            break; 

        case "QUESTIONS" : 
            console.log(action.payload);
            if(action.payload.quiz)
            {
                state = {
                    ...state,
                    quizzes : action.payload.quiz,
                    errorMessage : ''
                }
            }
            else
            {
                state = {
                    ...state,
                    errorMessage : action.payload.status,
                }
            }
            break;
        default:
            return state;
    }
}