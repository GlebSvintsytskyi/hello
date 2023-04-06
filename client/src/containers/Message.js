import React, { useEffect, useRef } from "react";
import { connect } from 'react-redux';

import  Message  from '../components/Messages';
import messagesActions from '../redux/actions/messages';

const Dialog = ({ currentDialogId, fetchMessages, items, isLoading }) => {
    const messagesRef = useRef(null);

    useEffect(() => {
        if (currentDialogId) {
            fetchMessages(currentDialogId);   
        }
    }, [currentDialogId]);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTo( 0, 999999 );
            console.log(messagesRef.current)   
        }
    }, [items]);

    return (
        <Message blokRef={messagesRef} items={items} isLoading={isLoading}/>
    )
}

export default connect(({ dialogs, messages }) => ({
    currentDialogId: dialogs.currentDialogId,
    items: messages.items,
    isLoading: messages.isLoading
}), messagesActions
)(Dialog);