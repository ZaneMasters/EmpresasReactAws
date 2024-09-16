// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://Testlitethinking-env.eba-2bkrmxjy.us-east-2.elasticbeanstalk.com',
});

export default axiosInstance;
