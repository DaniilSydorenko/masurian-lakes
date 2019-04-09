import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://lakes-4758d.firebaseio.com/'
});

export default instance;
