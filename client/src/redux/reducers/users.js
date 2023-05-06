const initialState = {
    data: null,
    isAuth: false
}

const users = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'USER:SET_DATA':
            return {
                ...state,
                data: payload,
                isAuth: true
            };
     
        default:
            return state;
    }
}

export const setUser = data => ({type: 'USER:SET_DATA', payload: data});

export default users;