import React from 'react';
import DialogItem from '../DialogItem/index';
import {orderBy} from "lodash";
import { Input, Empty } from 'antd';

import './Dialog.scss';

const Dialog = ({ items, userId, onSearch, inputValue, currentDialogId, onSelectDialog }) => {

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
                {items.length ? orderBy(items, ["created_at"], ["desc"]).map(item => (
                    <DialogItem
                        key={item._id}
                        userId={item._id}
                        user={item.user}
                        message={item}
                        unreaded={0}
                        isMe={item.user._id === userId}
                        currentDialogId={currentDialogId}
                        onSelect={onSelectDialog}
                    />
                )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нічого не найденно" />}   
            </div>
        </>
    )
}
 
export default Dialog;



// const filterItems = items.filter(item => {
//     return item.user.fullname.toLowerCase().includes(value.toLowerCase());
// })