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


// Response interceptor

AxiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


// Request interceptor with async token fetching

AxiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token');
        const isPublicRoute = config.url.includes('register') || config.url.includes('token');
        if (token && !isPublicRoute) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        const isProduction = import.meta.env.MODE === 'production';
        if (isProduction && !config.url.startsWith('api/')) {
            config.url = `api/${config.url}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

    

export default AxiosInstance;