import { SET_SELECTED_COURSE, SET_SELECTION_COURSE, SET_COURSE_SECTION, DISPLAY_ASSIGNMENT, SUBMIT_ASSIGNMENT } from '../actions/types'

const initialState = {
    selectedCourse: null,
    courseClicked: null,
    assignmentDisplayed: null
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
        default:
            return state;
    }
}