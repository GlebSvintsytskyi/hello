import React from 'react';
import PropTypes from 'prop-types';
import Message from '../Message';
import { Empty, Spin } from 'antd';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import './Messages.scss'

const Messages = ({ blokRef, isLoading, items, onRemoveMessage }) => {
    const userId = useSelector(state => state.users.data._id);

    return (
        <div
            ref={blokRef}
            className={classNames('messages', {'messages--loading': isLoading})}
        >
            {isLoading ? (
                <Spin size="large" tip="Loading..." />
            ) : items && !isLoading ? (
            items.length > 0 ? (
                items.map(item => (
                <Message
                    user={item.user}
                    key={item._id}
                    isMe={item.user._id === userId}
                    text={item.text}
                    date={item.date}
                    isReaded={item.unread}
                    attachments={item.attachments}
                    isTyping={item.isTyping}
                    onRemoveMessage={onRemoveMessage.bind(this, item._id)}
                />
            ))
            ) : (
                <Empty description="Діалог пустий" style={{marginTop: '200px'}} />
            )
            ) : (
                <Empty description="Відкрийте діалог" style={{marginTop: '200px'}} />
            )}
        </div>
    )
}
 
Messages.propTypes = {
    items: PropTypes.array,
};

export default Messages;