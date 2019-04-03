import { GET_USER_PROFILE, GET_ENROLLED_COURSES } from '../actions/types'

const initialState = {
    profile: null,
    enrolledCourses: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        
        case GET_USER_PROFILE : 
        return {
            ...state,
            profile: action.payload
        } 
        case GET_ENROLLED_COURSES : 
        return {
            ...state,
            enrolledCourses: action.payload
        }
        default:
            return state;
    }
}