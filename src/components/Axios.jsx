import axios from 'axios';

// const mybaseUrl = 'http://127.0.0.1:8000/'

const isDevelopment = import.meta.env.MODE === 'development'
const mybaseUrl = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY


const AxiosInstance = axios.create({
    baseURL: mybaseUrl,
    timeout: 5000, //ensures that there is latency before we get our posts
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
    }

});

// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== "") {
//         const cookies = document.cookie.split(";");
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             if (cookie.substring(0, name.length + 1) === (name + "=")) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }

// Experimental 




// Request interceptor with async token fetching

AxiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

    //Response interceptors to handle auth errors

// AxiosInstance.interceptors.response.use(
//     response => response,
//     async error => {
//         // handle 403 errors specifically
//         if (error.response && error.response.status === 403) {
//             console.error("403 Forbidden - Authentication/Permission error");

//             if (error.response.data && 
//                 error.response.data.detail && 
//                 error.response.data.detail.includes('CSRF')) {
//                     console.log("CSRF validation failed, will attempt to get a new token");
//                 }
//             }
//             return Promise.reject(error);
//         }
//     );

export default AxiosInstance;
// export { getCookie };