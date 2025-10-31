import axios from 'axios';

// Use environment variable, fallback to localhost for development
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
axios.defaults.withCredentials = true; // required for Sanctum
axios.defaults.withXSRFToken = true; // required for Sanctum

// Optional: Log the API URL in development for debugging
if (import.meta.env.DEV) {
  console.log('API Base URL:', axios.defaults.baseURL);
}

export default axios;