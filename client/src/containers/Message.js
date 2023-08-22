import React, { useEffect, useRef } from "react";
import { connect } from 'react-redux';
import socket from "../core/socket";

import  Message  from '../components/Messages';
import messagesActions from '../redux/actions/messages';

const Dialog = ({ currentDialogId, fetchMessages, addMessage, items, isLoading, removeMessageById }) => {

    const messagesRef = useRef(null);

    const onNewMessage = (data) => {
        addMessage(data);
    }

    useEffect(() => {
        if (currentDialogId) {
            fetchMessages(currentDialogId);   
        }

        socket.on('SERVER:NEW_MESSAGE', onNewMessage);
        return () => {
            socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage);
        }
    }, [currentDialogId]);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTo( 0, 999999 );   
        }
    }, [items]);

    return (
        <Message 
            blokRef={messagesRef} 
            items={items} 
            isLoading={isLoading} 
            onRemoveMessage={removeMessageById} 
            currentDialogId={currentDialogId}
        />
    )
}

export default connect(({ dialogs, messages }) => ({
    currentDialogId: dialogs.currentDialogId,
    items: messages.items,
    isLoading: messages.isLoading
}), messagesActions
)(Dialog);