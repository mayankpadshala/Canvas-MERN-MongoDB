import { SET_SELECTED_COURSE, SET_SELECTION_COURSE } from '../actions/types'

const initialState = {
    selectedCourse: null,
    courseClicked: null
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
        default:
            return state;
    }
}