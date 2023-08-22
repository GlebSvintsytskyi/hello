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
    removeMessage: id => ({
        type: "MESSAGES:REMOVE_MESSAGE",
        payload: id
    }),
    addMessage: message => (dispatch, getState) => {
        const { dialogs } = getState();
        const { currentDialogId } = dialogs;
    
        if (currentDialogId === message.dialog._id) {
          dispatch({
            type: "MESSAGES:ADD_MESSAGE",
            payload: message
          });
        }
      },

    fetchSendMessage: ( text, dialogId, attachments ) => dispatch => {
        messagesApi.send(text, dialogId, attachments);
    },

    removeMessageById: (id) => dispatch => {
        messagesApi
            .removeById(id)
            .then(() => {
                dispatch(messagesActions.removeMessage(id));
            })
            .catch(() => {
                dispatch(messagesActions.setIsLoading(false));
            });
    },

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