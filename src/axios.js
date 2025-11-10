import axios from "axios";

// In production: use relative URLs (Netlify proxy handles it)
// In development: use localhost directly
const isProduction = import.meta.env.PROD;

axios.defaults.baseURL = isProduction
  ? "http://ec2-50-17-90-79.compute-1.amazonaws.com" // Netlify will proxy this to your EC2
  : "http://localhost:8000";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

if (import.meta.env.DEV) {
  console.log("API Base URL:", axios.defaults.baseURL);
}

export default axios;