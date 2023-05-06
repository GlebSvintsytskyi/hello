import userApi from "../../utills/api/user";

const usersActions = { 
    setDialogs: data => ({
        type: 'USER:SET_DATA',
        payload: data
    }),

    fetchUserRegistration: (fullname, email, password) => dispatch => {
        return userApi.registration(fullname, email, password).then(({ data }) => {
            localStorage.setItem('token', data.token);
            dispatch(usersActions.setDialogs(data.user));
        })
    },

    fetchUserLogin: (email, password) => dispatch => {
        userApi.login(email, password).then(({ data }) => {
            localStorage.setItem('token', data.token);
            dispatch(usersActions.setDialogs(data.user));
        })
    }
}

export default usersActions;