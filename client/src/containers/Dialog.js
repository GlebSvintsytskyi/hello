import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import  Dialog  from '../components/Dialog/index';
import dialogsActions from '../redux/actions/dialogs';

const Dialogs = ({ fetchDialogs, currentDialogId, setCurrentDialogId, items, userId }) => {
    const [inputValue, setInputValue] = useState('');
    const [filtred, setFiltred] = useState(Array.from(items));

    const onChangeInput = (value) => {
        setFiltred(
            items.filter(
                dialog => 
                dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0
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

    return (
        <Dialog 
            userId={userId}
            items={filtred}
            onSearch={onChangeInput}
            inputValue={inputValue}
            currentDialogId={currentDialogId}
            onSelectDialog={setCurrentDialogId}    
        />
    )
}

export default connect(({ dialogs }) => dialogs, dialogsActions)(Dialogs);