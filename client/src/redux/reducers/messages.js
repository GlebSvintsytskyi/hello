const initialState = {
    items: [],
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

        case 'MESSAGES:REMOVE_MESSAGE':
            return {
                ...state,
                items: state.items.filter(message => message._id !== payload),
            };

        case 'MESSAGES:ADD_MESSAGE':
            return {
                ...state,
                items: [...state.items, payload],
            };
    
        default:
            return state;
    }
}

export default dialogs;