import axios from "axios";

export const signUp = (body) => {
    return axios.post('/signup', body).then((res) => {
        console.log(res)
        return res.data
    }).catch((error) => { 
        return error
    })
}

export const signIn = (body) => {
    return axios.post('/signin', body).then((res) => {
        console.log(res)
        return res.data
    }).catch((error) => { 
        return error
    })
}