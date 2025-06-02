import axios from 'axios';



const isDevelopment = import.meta.env.MODE === 'development'
const mybaseUrl = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY


const AxiosInstance = axios.create({
    baseURL: mybaseUrl,
    timeout: 20000, //ensures that there is latency before we get our posts
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
    }

});






// Request interceptor with async token fetching

AxiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

    

export default AxiosInstance;