import axios from 'axios'


export const getStructure = (data) => {
    return axios.post("/api/files/getFileStructure1", data)
    .then(response => {
        return response;
    });
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