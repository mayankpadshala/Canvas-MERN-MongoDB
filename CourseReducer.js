import {combineReducers} from 'redux';

const initialState = {
    courseId: '',
    courseName: '',
    createdBy: '',
    studentsEnrolled: '',
    sjsuID : '',
    fName: '',
    lName: '',
    profilePic: '',
    token: '',
    announcements: '',
    assignments: '',
    quizzes: '',
    errorMessage: ''
}

const CourseReducer = (state = initialState, action) => {

    switch(action.type)
    {
        case "COURSE_STUDENTS" :  console.log("User Payload");
                            console.log(action.payload);
                            state = {
                                ...state,
                                courseId : action.payload.COURSE_ID,
                                courseName : action.payload.COURSE_NAME,
                                studentsEnrolled : action.payload.STUDENTS_ENROLLED,
                                errorMessage : ''
                            }
                            break;  
 
        case "COURSE_INFO" : console.log(action.payload);
                                state = {
                                    ...state,
                                    courseId : action.payload.COURSE_ID,
                                    courseName : action.payload.COURSE_NAME,
                                    createdBy : action.payload.CREATED_BY,
                                    announcements : action.payload.ANNOUNCEMENTS,
                                    errorMessage : ''
                                }
                                break; 
        
        case "ASSIGNMENT_INFO" : console.log(action.payload);
                                state = {
                                    ...state,
                                    courseId : action.payload.COURSE_ID,
                                    courseName : action.payload.COURSE_NAME,
                                    assignments : action.payload.ASSIGNMENTS,
                                    errorMessage : ''
                                }
                                break; 
                                
        case "QUIZ_INFO" : console.log(action.payload);
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
                                        errorMessage : action.payload.error.message,
                                    }
                                }
                                break; 

        case "QUESTION_INFO" : console.log(action.payload);
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

        case "QUESTIONS" : console.log(action.payload);
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
                                
        
    }
    return state;

}


export default combineReducers({
    CourseReducer
});