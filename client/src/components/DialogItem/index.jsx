import React from "react";
import classNames from 'classnames';
import { format, isToday  } from 'date-fns';
import { Link } from 'react-router-dom';


import Avatar from '../Avatar';

import './DialogItem.scss';

const getMessageTime = created_at => {
    if (isToday(created_at)) {
        return format(new Date(created_at), "HH:mm");
    }else {
        return format(new Date(created_at), `dd.MM.yyyy`);
    }
}

const DialogItem = ({ user, message, unreaded, isMe, userId, currentDialogId }) => {
    
    return (
        <Link to={`/dialog/${currentDialogId}`}>
        <div className={classNames('dialogs__item', {
            'dialogs__item--online' : user.isOnline,
            'dialogs__item--selected' : currentDialogId === userId
        })}
        >
            <div className='dialogs__item-avatar'>
                <Avatar user={user}/>
            </div>
            <div className='dialogs__item-info'>
                <div className='dialogs__item-info-top'>
                    <b>{user.fullname}</b>
                    <span>
                        {getMessageTime(user.createdAt)}
                    </span>
                </div>
                <div className='dialogs__item-info-bottom'>
                    <p>{message.text}</p>
                    {unreaded > 0 && (
                        <div className='dialogs__item-info-bottom-count'>{unreaded > 9 ? '+9' : unreaded}</div>
                    )}
                </div>
            </div>
        </div>
        
        </Link>
    )
}
 
export default DialogItem;