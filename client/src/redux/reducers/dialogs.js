const initialState = {
    items: [],
    currentDialogId: null,
    isLoading: false
}

const dialogs = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'DIALOGS:SET_ITEMS':
            return {
                ...state,
                items: payload
            };

        case 'DIALOGS:SET_CARRENT_DIALOG_ID':
            return {
                ...state,
                currentDialogId: payload
            };
    
        default:
            return state;
    }
}

export default dialogs;