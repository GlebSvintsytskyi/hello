import { axiosAuth, axiosDefault } from "../../core/axios";
import { setUser } from "../../redux/reducers/users";
import openNatification from "../helpers/openNatification";

const fetchUserRegistration = (fullname, email, password, password_2, navigate) => {
    return async dispatch => {
        try {
            if (password !== password_2) {
                openNatification({
                    title: 'Bad request!',
                    text: 'password mismatch',
                    type: 'error',
                  });
            } else {
                const response = await axiosDefault.post('/user/registration', {
                    fullname, 
                    email, 
                    password,
                    password_2
                });
    
                openNatification({
                    title: 'Success!',
                    text: 'Authorization was successful',
                    type: 'success',
                  });
    
                localStorage.setItem('token', response.data.token);
                dispatch( setUser(response.data.user) );
                navigate('/verify');
            }
        } catch (error) {
            openNatification({
                title: 'Bad request!',
                text: error.response.data.message,
                type: 'error',
              });
        }
    }
}

export const verifyUser = async(hash) => {
    try {
        const { data } = await axiosDefault.get('/user/verify?hash=' + hash);
        return data
    } catch (error) {
        return error;
    }
}

export const fetchUserLogin = (email, password, navigate) => {
    return async dispatch => {
        try {
            const response = await axiosAuth.post('/user/login', {
            email,
            password
        });

        openNatification({
            title: 'Success!',
            text: 'Authorization was successful',
            type: 'success',
          });

        dispatch( setUser(response.data.user) );
        localStorage.setItem('token', response.data.token)
        navigate('/im');
        } catch (error) {
            openNatification({
                title: 'Bad request!',
                text: error.response.data.message,
                type: 'error',
              });
        }
    }
}

export const findUser = async(query) => {
    try {
        const data = await axiosAuth.get('/user/find?query=' + query);
        
        return data;
    } catch (error) {
        return error;
    }
}

export default fetchUserRegistration;