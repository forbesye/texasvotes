import axios from 'axios';

const api_url = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://localhost:5000";

const client = axios.create({
    baseURL: api_url
});

export default client;