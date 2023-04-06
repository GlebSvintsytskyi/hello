import React from 'react';
import PropTypes from 'prop-types';
import Message from '../Message';
import { Empty, Spin } from 'antd';
import classNames from 'classnames';

import './Messages.scss'

const Messages = ({ blokRef, isLoading, items }) => {

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
                    {...item}
                    key={item._id}
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