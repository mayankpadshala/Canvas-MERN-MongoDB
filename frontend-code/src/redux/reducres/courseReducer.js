import { SET_SELECTED_COURSE } from '../actions/types'

const initialState = {
    selectedCourse: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        
        case SET_SELECTED_COURSE : 
        return {
            ...state,
            selectedCourse: action.payload
        } 
        default:
            return state;
    }
}