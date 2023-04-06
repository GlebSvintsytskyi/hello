import messagesApi from '../../utills/api/messages';

const messagesActions = { 
    setMessages: items => ({
        type: 'MESSAGES:SET_ITEMS',
        payload: items
    }),
    setIsLoading: bool => ({
        type: 'MESSAGES:SET_IS_LOADING',
        payload: bool
    }),

    fetchMessages: ( dialogId ) => dispatch => {
        dispatch(messagesActions.setIsLoading(true));

        messagesApi.getAllByDialogId(dialogId).then(({ data }) => {
            dispatch(messagesActions.setMessages(data));
        })
        .catch(() => {
            dispatch(messagesActions.setIsLoading(false));
        });
    }
}

export default messagesActions;