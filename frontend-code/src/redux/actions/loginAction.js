import axios from "axios/index";

export function userInfo(values){
    return{
        type:"USER_INFO",
        payload:values
    }
}

export const login = (user) => {
    return dispatch => {
        return axios
        .post('users/login', {
            sjsuid: user.sjsuid,
            password: user.password
        })
        // .then(res => {
        //     console.log(res.data);
        //     // localStorage.setItem('usertoken', res.data.token);
        //     // return res.data;
        //     dispatch(userInfo(res.data));
        // })
        // .catch(err => {
        //     console.log(err)
        // })
    }
}

export const getUser = user => {
    return dispatch => {
        return axios
        .post('/users/user', {
            sjsuid: user.sjsuid
        })
        .then(res => {
            // return res.data;
            dispatch(userInfo(res.data))
        })
        // .catch(err => {
        //     console.log(err)
        // })
    }
}

export const updateUser = user => {
    return dispatch => {
        return axios
        .put('/users/user/update', {
            fname : user.fname,
            lname : user.lname,
            sjsuid: user.sjsuid,
            email : user.email,
            phone : user.phone,
            about : user.about,
            city : user.city,
            faculty : user.faculty,
            company : user.company,
            country : user.country,
            gender : user.gender,
            hometown : user.hometown,
        })
        .then(res => {
            // return res.data;
            dispatch(userInfo(res.data));
        })
        // .catch(err => {
        //     return err
        // })
    }
}

export const register = newUser => {
    return dispatch => {
    return axios
    .post ('users/register', {
        fname : newUser.fname,
        lname : newUser.lname,
        sjsuid: newUser.sjsuid,
        password: newUser.password,
        email : newUser.email,
        phone : newUser.phone,
        flag : newUser.flag
    })
    .then(res => {
        dispatch(userInfo(res));
    })
    .catch(err => {
        console.log(err);
    })
}
}
