import axios from "axios";
import { toast } from "react-toastify";

export const signUp = (body) => {
    return axios.post('/signup', body).then((res) => {
        console.log(res)
        return res.data
    }).catch((error) => {
        return error
    })
}

export const signIn = (body) => {
    console.log(body)
    return axios.post('/signin', body).then((res) => {
        console.log(res)
        if (res.data !== undefined) {
            toast.success('Dang nhap thanh cong', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return res.data
        }
    }).catch((error) => {
        console.log(error)
        toast.error(error.response.data, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    })
}