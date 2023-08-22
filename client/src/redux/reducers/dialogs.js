const initialState = {
    items: [],
    currentDialogId: window.location.pathname.split('/dialog/')[1],
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

export const setItems = data => ({type: 'DIALOGS:SET_ITEMS', payload: data});
export const setCarrentDialogId = data => ({type: 'DIALOGS:SET_CARRENT_DIALOG_ID', payload: data});

export default dialogs;