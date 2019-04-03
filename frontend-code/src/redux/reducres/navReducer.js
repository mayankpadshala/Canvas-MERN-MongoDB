import { SET_CURRENT_COURSES, CHANGE_SIDENAV_STATE, CHANGE_CHILDNAV_ACCOUNT, CHANGE_CHILDNAV_COURSE, OPEN_SIDENAV_STATE, CLOSE_SIDENAV_STATE } from '../actions/types'

const initialState = {
    sideNav: true,
    rootDrawerWidth: 86,
    childNavAccount: false,
    childNavCourse: false,
    courses: [],
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_COURSES : 
            return {
                ...state,
                courses: action.payload
            } 
        case OPEN_SIDENAV_STATE : 
        return {
            ...state,
            sideNav: true,
            rootDrawerWidth: 84,
        } 
        case CLOSE_SIDENAV_STATE : 
        return {
            ...state,
            sideNav: false,
            rootDrawerWidth: 56,
        } 
        case CHANGE_CHILDNAV_ACCOUNT : 
        return {
            ...state,
            childNavAccount: !state.childNavAccount,
            childNavCourse: false,
        } 
        case CHANGE_CHILDNAV_COURSE : 
        return {
            ...state,
            childNavCourse: !state.childNavCourse,
            childNavAccount: false
        } 
        default:
            return state;
    }
}