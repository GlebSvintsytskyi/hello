import React from 'react';
import classNames from 'classnames';
import { format, isToday  } from 'date-fns';
import IconReaded from '../IconReaded/index';
import Avatar from '../Avatar';

import './DialogItem.scss';

const getMessageTime = created_at => {
    if (isToday(created_at)) {
        return format(new Date(created_at), "HH:mm");
    }else {
        return format(new Date(created_at), `dd.MM.yyyy`);
    }
}

const DialogItem = ({ user, message, unreaded, isMe, userId, onSelect, currentDialogId }) => {
    return (
        <div className={classNames('dialogs__item', {
            'dialogs__item--online' : user.isOnline,
            'dialogs__item--selected' : currentDialogId === userId
        })}
        onClick={onSelect.bind(this, userId)}
        >
            <div className='dialogs__item-avatar'>
                <Avatar user={user}/>
            </div>
            <div className='dialogs__item-info'>
                <div className='dialogs__item-info-top'>
                    <b>{user.fullname}</b>
                    <span>
                        {getMessageTime(message.created_at)}
                    </span>
                </div>
                <div className='dialogs__item-info-bottom'>
                    <p>{message.text}</p>
                    {unreaded <= 0 && <IconReaded isMe={isMe} isReaded={message.isReaded}/>}
                    {unreaded > 0 && (
                        <div className='dialogs__item-info-bottom-count'>{unreaded > 9 ? '+9' : unreaded}</div>
                    )}
                </div>
            </div>
        </div>  
    )
}
 
export default DialogItem;