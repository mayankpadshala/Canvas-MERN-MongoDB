import { SET_CURRENT_COURSES, CHANGE_SIDENAV_STATE, CHANGE_CHILDNAV_ACCOUNT, OPEN_SIDENAV_STATE, CLOSE_SIDENAV_STATE, CHANGE_CHILDNAV_COURSE } from '../actions/types'

//Get courses through user id
export const setNav = (userData , history ) => dispatch => {

        dispatch({
            type: SET_CURRENT_COURSES,
            payload: userData
        })  
}

//Chnage SideNav State
export const openSideNavState = () => dispatch => {

    dispatch({
        type: OPEN_SIDENAV_STATE,
    })  
}

//Chnage SideNav State
export const closeSideNavState = () => dispatch => {

    dispatch({
        type: CLOSE_SIDENAV_STATE,
    })  
}

//Chnage ChildNav Account State
export const changeChildNavAccount = () => dispatch => {

    dispatch({
        type: CHANGE_CHILDNAV_ACCOUNT,
    })  
}

//Chnage ChildNav COurse State
export const changeChildNavCourse = () => dispatch => {

    dispatch({
        type: CHANGE_CHILDNAV_COURSE,
    })  
}

export const getCourses = (userData) => dispatch => {
    console.log(userData);
}