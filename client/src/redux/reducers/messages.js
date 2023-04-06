const initialState = {
    items: null,
    isLoading: false,
}

const dialogs = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'MESSAGES:SET_ITEMS':
            return {
                ...state,
                items: payload,
                isLoading: false
            };

        case 'MESSAGES:SET_IS_LOADING':
            return {
                ...state,
                isLoading: payload
            };
    
        default:
            return state;
    }
}

export default dialogs;