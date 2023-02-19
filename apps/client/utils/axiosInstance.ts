import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4001/graphql',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',    
        'Cache-Control': 'no-cache',
    },
});

export default instance;