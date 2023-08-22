import React, { useState, useEffect } from "react";
import { connect, useSelector } from 'react-redux';

import  Dialog  from '../components/Dialog/index';
import dialogsActions from '../redux/actions/dialogs'
import socket from "../core/socket";

const Dialogs = ({ fetchDialogs, currentDialogId, setCurrentDialogId, items }) => {
    const [inputValue, setInputValue] = useState('');
    const [filtred, setFiltred] = useState(Array.from(items));

    const user = useSelector(state => state.users.data);

    const onChangeInput = (value) => {
        setFiltred(
            items.filter(
                dialog => 
                dialog.partner.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0  
                ||
                dialog.author.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0
            )
        );
        setInputValue(value);
    }

    useEffect(() => {
        if (!items.length) {
            fetchDialogs();
        } else {
            setFiltred(items);
        }
    }, [items]);

    socket.on('SERVER:DIALOG:CREATED', () => {
        fetchDialogs();
    });

    return (
        <Dialog 
            userId={user._id}
            items={filtred}
            onSearch={onChangeInput}
            inputValue={inputValue}
            currentDialogId={currentDialogId}
            onSelectDialog={setCurrentDialogId}  
        />
    )
}

export default connect(({ dialogs }) => dialogs, dialogsActions)(Dialogs);