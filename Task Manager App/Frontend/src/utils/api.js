import axios from 'axios'

const API = axios.create({
    baseURL:"https://task-manager-backend-bsa2.onrender.com/api",
    withCredentials:true
});
export default API;
