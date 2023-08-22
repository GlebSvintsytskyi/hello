import React from 'react';
import DialogItem from '../DialogItem/index';
import {orderBy} from "lodash";
import { Input, Empty } from 'antd';

import './Dialog.scss';

const Dialog = ({ items, userId, onSearch, inputValue }) => {

    return (
        <>
            <div className="search">
                <Input
                    placeholder="Пошук контактів"
                    onChange={e => onSearch(e.target.value)}
                    value={inputValue}
                />
            </div>
            <div className='items'> 
                {items.length ? orderBy(items, ["created_at"], ["desc"]).map(item => 
                    item.author._id === userId ?
                    (
                    <DialogItem
                        key={item._id}
                        userId={userId}
                        user={item.partner}
                        message={item}
                        unreaded={0}
                        isMe={item.author._id === userId}
                        currentDialogId={item._id}
                    />
                    )
                    :
                    (
                    <DialogItem
                        key={item._id}
                        userId={userId}
                        user={item.author}
                        message={item}
                        unreaded={0}
                        isMe={item.author._id === userId}
                        currentDialogId={item._id}
                    />    
                    )
                ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нічого не знайденно" />}   
            </div>
        </>
    )
}
 
export default Dialog;



                    
    
                   