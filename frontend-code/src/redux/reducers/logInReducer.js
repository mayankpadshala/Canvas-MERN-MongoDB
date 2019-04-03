import {combineReducers} from 'redux';

const initialState = {
  fname: "",
  lname: "",
  email: "",
  phone: "",
  school: "",
  password: "",
  bio: "",
  language: "",
  city: "",
  sjsuid: "",
  company: "",
  country: "",
  gender: "",
  hometown: "",
  profileImg: "",
}

const LoginReducer = (state = initialState, action) => {

    if(action.type == "USER_INFO") {
        console.log(action.payload);
        state = {
            ...state,
            sjsuid : action.payload.sjsuid,
            passsword : action.payload.password,
            flag: action.payload.flag,
            fname: action.payload.fname,
            lname: action.payload.lname,
            phone: action.payload.phone,
            city: action.payload.city,
            country: action.payload.country,
            company: action.payload.company,
            school: action.payload.school,
            hometown: action.payload.hometown,
            language: action.payload.language,
            gender: action.payload.gender,
            bio: action.payload.about,
            profileImg: action.payload.profileImg,
            email: action.payload.email,
        }
    }
    return state;

}

// const LoginReducer = (state = initState, action) => {
//     if(action.type === "LOGIN") {
//         console.log("In reducer : "+action.payload.userid)
//         state = {
//             ...state,
//             userid : action.payload.userid,
//             passsword : action.payload.password
//         }
//     }
//     return state;
// }

export default combineReducers({
    LoginReducer
});