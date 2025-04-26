import axios from 'axios'

// const mybaseUrl = 'http://127.0.0.1:8000/'

const isDevelopment = import.meta.env.MODE === 'development'
const mybaseUrl = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY

const AxiosInstance = axios.create({
    baseURL: mybaseUrl,
    timeout: 5000, //ensures that there is latency before we get our posts
    headers: {
        "Content-Type": "application/json",
        accept: "application/json"
    }

});

export default AxiosInstance