import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'; // your Laravel API URL
axios.defaults.withCredentials = true; // required for Sanctum
axios.defaults.withXSRFToken = true; // required for Sanctum

export default axios;
