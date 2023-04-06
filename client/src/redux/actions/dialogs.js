import dialogsApi from '../../utills/api/dialogs';

const dialogsActions = { 
    setDialogs: items => ({
        type: 'DIALOGS:SET_ITEMS',
        payload: items
    }),

    setCurrentDialogId: id => ({
        type: 'DIALOGS:SET_CARRENT_DIALOG_ID',
        payload: id
    }),

    fetchDialogs: () => dispatch => {
        dialogsApi.getAll().then(({ data }) => {
            dispatch(dialogsActions.setDialogs(data));
        })
    }
}

export default dialogsActions;