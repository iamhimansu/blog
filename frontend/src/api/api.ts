import axios from 'axios';

const API_VERSION = process.env.REACT_APP_API_VERSION;
const API_PATH = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: `${API_PATH}/${API_VERSION}`,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors here, e.g., logging out on 401
        if (error.response && error.response.status === 401) {
            // Optional: Dispatch logout action or redirect to login
            console.warn('Unauthorized access - redirecting to login...');
        }
        return Promise.reject(error);
    }
);

export default api;