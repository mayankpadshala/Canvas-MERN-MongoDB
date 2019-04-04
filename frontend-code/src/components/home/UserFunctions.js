import axios from 'axios'

export const register = newUser => {
    return axios
    .post ('users/register', {
        FNAME : newUser.FNAME,
        LNAME : newUser.LNAME,
        SJSUID: newUser.SJSUID,
        PASSWORD: newUser.PASSWORD,
        EMAIL : newUser.EMAIL,
        PHONE : newUser.PHONE,
        FLAG : newUser.FLAG
    })
    .then(res => {
        console.log(res)
        console.log("User Registered Successfully");
    })
    .catch(err => {
        console.log(err);
    })
}

export const login = user => {
    return axios
    .post('users/login', {
        SJSUID: user.SJSUID,
        PASSWORD: user.PASSWORD
    })
    .then(res => {
        // console.log(res);
        localStorage.setItem('usertoken', res.data.token);
        return res.data;
    })
    .catch(err => {
        console.log(err)
    })
}

export const getUser = user => {
    return axios
    .post('/users/user', {
        SJSUID: user.SJSUID
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err)
    })
}

export const updateUser = user => {
    return axios
    .put('/users/user/update', {
        FNAME : user.FNAME,
        LNAME : user.LNAME,
        SJSUID: user.SJSUID,
        EMAIL : user.EMAIL,
        PHONE : user.PHONE,
        ABOUT : user.ABOUT,
        CITY : user.CITY,
        FACULTY : user.FACULTY,
        COMPANY : user.COMPANY,
        COUNTRY : user.COUNTRY,
        GENDER : user.GENDER,
        HOMETOWN : user.HOMETOWN,
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err)
    })
}


export const getEnrolledCourses = user => {
    return axios
    .post('/course/enrolledCourses', {
        SJSUID: user.SJSUID
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        return err
    })
}

export const getEnrolledPeople = course => {
    return axios
    .post('/course/enrolledPeople', {
        COURSEID: course.COURSEID
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        return err
    })
}

export const getCoursesbyID = course => {
    return axios
    .post('/course/coursesByID', {
        CREATEDBY : course.SJSUID
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        return err
    })
}

export const getCourses = course => {
    return axios
    .post('/course/courses', )
    .then(res => {
        return res.data;
    })
    .catch(err => {
        return err
    })
}

export const getbyCOURSEID = course => {
    return axios
    .post('/course/getbyCOURSEID', {
        COURSEID: course.COURSEID
    } )
    .then(res => {
        // console.log(res);
        return res.data;
    })
    .catch(err => {
        return err
    })
}

export const enrollUser = user => {
    return axios
    .post('/course/courses/enroll', {
        SJSUID : user.SJSUID,
        COURSEID : user.COURSEID,
        STATUS : user.STATUS,
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err)
    })
}

export const deleteUser = user => {
    return axios
    .post('/course/courses/delete', {
        SJSUID : user.SJSUID,
        COURSEID : user.COURSEID,
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err)
    })
}

export const createCourse = course => {
    return axios
    .post('/course/create', {
        SJSUID : course.SJSUID,
        COURSEID : course.COURSEID,
        CNAME : course.CNAME,
        DEPARTMENT: course.DEPARTMENT,
        DESCRIPTION: course.DESCRIPTION,
        CROOM: course.CROOM,
        CCAPACITY: course.CCAPACITY,
        WAITCAPACITY: course.WAITCAPACITY,
        COURSETERM: course.COURSETERM,
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err)
    })
}

export const getSearchedCourse = course => {
    return axios
    .post('/course/courses/searchById', {
        COURSEFILTER : course.COURSEFILTER,
        COURSEID : course.COURSEID
    })
    .then(res => {
        // console.log(res);
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const getSearchedCoursebyTerm = course => {
    return axios
    .post('/course/courses/searchByTerm', {
        COURSETERM : course.COURSETERM,
    })
    .then(res => {
        // console.log(res);
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const getSearchedCoursebyName = course => {
    return axios
    .post('/course/courses/searchByName', {
        CNAME : course.CNAME,
    })
    .then(res => {
        // console.log(res);
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const uploadFile = data => {
    
    // console.log(data);

    const fd = new FormData();
    // fd.append("profileImg", this.state.selectedFile, this.state.selectedFile.name);

    fd.append("profileImg", data.file, data.file.name);
    fd.append("SJSUID", data.SJSUID);
   
    return axios.post('/files/updateProfile', fd)
    .then(res => {
        return res.data;
    })
}

export const getAnnounByCors = courseId => {
    return axios.post('/course/announcement', {
        COURSEID: courseId,
    })
    .then(res => {
        return res
    })
}

export const createAnnouncement = (announcemnet) => {
    return axios.post('/course/announcement/create', announcemnet)
    .then(res => {
        console.log(res);
    })
}

export const delAnnouncement = (id) => {
    return axios.post('/course/announcement/delete', {
        ID : id,
    })
    .then(res => {
        console.log(res);
    })
}

export const uploadAssignment = (data) => {
    console.log(data);

    const fd = new FormData();
    // fd.append("profileImg", this.state.selectedFile, this.state.selectedFile.name);

    fd.append("Assignment", data.file, data.file.name);
    fd.append("SJSUID", data.SJSUID);
    fd.append("COURSEID", data.COURSEID);
    fd.append("NAME", data.NAME);
    fd.append("DUEDATE", data.DUEDATE);
    fd.append("TOTALPOINTS", data.TOTALPOINTS);

    return axios.post('/files/uploadAssignment', fd)
    .then(res => {
        console.log(res.data);
        return res.data;
    })

}

export const getAssignByCourse = courseId => {
    // console.log(courseId);
    return axios.post('/files/getAssignments', {
        COURSEID: courseId
    })
    .then(res => {
        console.log(res.data);
        return res.data;
    })
}

export const delAssignment = assignID => {
    return axios.post('/files/deleteAssignment', {
        ID: assignID
    })
    .then( res=> {
        console.log(res)
    })
}

export const uploadSubmission = (data) => {
    console.log(data);
    const fd = new FormData();
    // fd.append("profileImg", this.state.selectedFile, this.state.selectedFile.name);

    fd.append("Submission", data.submissionFile, data.submissionFile.name);
    fd.append("SJSUID", data.SJSUID);
    fd.append("COURSEID", data.COURSEID);
    fd.append("ASSIGNMENTID", data.ASSIGNMENTID);
    // fd.append("DUEDATE", data.DUEDATE);
    // fd.append("TOTALPOINTS", data.TOTALPOINTS);

    return axios.post('/files/submitAssignment', fd)
    .then( res=> {
        console.log(res)
    })
}

export const getAllSubmissions = (data) => {
    return axios.post('/files/getSubmissions', data)
    .then(res => {
        return res.data;
    });
}

export const getStructure = (data) => {
    return axios.post("/files/getFileStructure1", data)
    .then(response => {
        return response;
    });
}

export const getQuizByCourse = (COURSEID) => {
    const data = {
        COURSEID
    }
    return axios.post('/course/getquiz', data)
    .then(response => {
        return response
    })
}

export const createQuiz = (data) => {
    console.log(data);

    return axios.post('/course/createQuiz', data)
    .then(response => {
        return response
    })
}

export const getQuizQuestions = (data) => {

    return axios.post('/course/getQuestions', {QUIZID: data})
    .then(response => {
        // console.log(response)
        return response
    })
}

export const addQuizQuestion = (data) => {

    return axios.post('/course/addQuestions', data)
    .then(response => {
        // console.log(response)
        return response
    })
}

export const storeAddCode = (data) => {
    // console.log(data);

    return axios.post('/course/addCode', data)
    .then(response => {
      return response;
    })
    .catch(error => {
        return error;
    })
}

export const getAddCodes = (COURSEID) => {
    const data = {
        COURSEID: COURSEID
    }
    
    return axios.post('/course/getAddCodes', data)
    .then(response => {
      return response;
    })
    .catch(error => {
        return error;
    })
}

export const enrollUsingAddCode = (data) => {
    return axios.post('/course/validateAddCode', data)
    .then(response => {
      return response;
    })
    .catch(error => {
        return error;
    })

}