import axios from 'axios';

const API_VERSION = process.env.REACT_APP_API_VERSION;
const API_PATH = process.env.REACT_APP_API_URL;

console.log(`${API_PATH}/${API_VERSION}`);

const api = axios.create({
    baseURL: `${API_PATH}/${API_VERSION}`, // Ensure this matches your backend port
});

// Optional: We can automatically attach the token to every request here later!
export default api;