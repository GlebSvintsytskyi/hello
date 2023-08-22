const initialState = {
    data: {},
    isAuth: false
}

const users = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'USER:SET_DATA':
            return {
                ...state,
                data: payload,
                isAuth: true
            }
        case 'LOG_OUT':
            
            return {
                ...state,
                data: {},
                isAuth: false
            }
        default:
            return state;
    }
}

export const setUser = data => ({type:'USER:SET_DATA', payload: data});
export const logout = () => ({type: 'LOG_OUT'})

export default users;