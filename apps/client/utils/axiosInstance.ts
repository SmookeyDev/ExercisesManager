import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',    
        'Cache-Control': 'no-cache',
    },
});

export default instance;