import axios from 'axios';

const axiosDefault = axios.create({
    baseURL: 'http://localhost:9998/'
});

const axiosAuth = axios.create({
    baseURL: 'http://localhost:9998/'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}

axiosAuth.interceptors.request.use(authInterceptor);


export  {
    axiosDefault,
    axiosAuth
}