import { axiosAuth, axiosDefault } from "../../core/axios";
import { setUser } from "../../redux/reducers/users";
import openNatification from "../helpers/openNatification";

const fetchUserRegistration = (fullname, email, password) => {
    return async dispatch => {
        try {
            const response = await axiosDefault.post('/user/registration', {
                fullname, 
                email, 
                password
            });

            openNatification({
                title: 'Success!',
                text: 'Authorization was successful',
                type: 'success',
              });

            localStorage.setItem('token', response.data.token);
            console.log(response.data)
            dispatch( setUser(response.data.user) );

        } catch (error) {
            openNatification({
                title: 'Bad request!',
                text: error.response.data.message,
                type: 'error',
              });
        }
    }
}

export const fetchUserLogin = (email, password) => {
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
        localStorage.setItem('token', response.data.token);
        console.log(response.data)
        } catch (error) {
            openNatification({
                title: 'Bad request!',
                text: error.response.data.message,
                type: 'error',
              });
        }
    }
}

export default fetchUserRegistration;