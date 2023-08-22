import React, { useState, useRef } from 'react';
import { Button, Popover, Space } from 'antd';

import Time from '../../components/Time/index';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconReaded from '../../components/IconReaded/index';
import Avatar from '../Avatar/index';

import waveSvg from '../../assets/img/wave.svg';
import { PauseOutlined } from '@ant-design/icons';
import playSvg from '../../assets/img/play.svg';
import data from '@emoji-mart/data'
import { init } from 'emoji-mart'
import reactStringReplace from 'react-string-replace';

import './Message.scss'; 

const Message = ({
    user,
    text, 
    date,
    isMe,  
    isReaded, 
    attachments, 
    isTyping,
    onRemoveMessage
}) => {
    init({ data });

    const [isPlaying, setIsPlaing] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioElem = useRef(null);

    const convertCurrentTime = (number) => {
        const mins = Math.floor(number / 60);
        const secs = (number % 60).toFixed();
        return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`
    }

    const startAudio = () => {
        audioElem.current.play();
        setIsPlaing(true);
        audioElem.current.addEventListener('ended', () => {
            setIsPlaing(false); 
            setCurrentTime(0);
        });
        audioElem.current.addEventListener('timeupdate', () => { setCurrentTime(audioElem.current.currentTime); });
    }

    const pauseAudio = () => {
        audioElem.current.pause();
        setIsPlaing(false);
    }

    const renderAttachmetsItems = (item) => {
        if (item.ext === 'webm') {
            return (
                <div className="message__audio">
                    <audio ref={audioElem}
                    src={item.url} 
                    preload="auto" 
                />
                    <div className="message__audio-progress">
                        <div className="message__audio-info">
                            <div className="message__audio-btn">
                                { isPlaying ? ( 
                                    <button onClick={pauseAudio}><PauseOutlined style={{color: '#fff'}}/></button>
                                ) : ( 
                                    <button onClick={startAudio}><img src={playSvg} alt='Playing svg'/></button>
                                )}
                            </div>
                            <div className="message__audio-wave">
                                <img src={waveSvg} alt="Wave svg" />
                            </div>
                            <span className="message__audio-duration">{convertCurrentTime(currentTime)}</span>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="message__attachments">
                    { attachments.map(item => (
                        <div key={item.url} className="message__attachments--item">
                            <img src={item.url} alt={item.filename}/>
                        </div>
                    ))
                    }
                </div>
            )
        }
    }

    const isAudio = () => {
        const file = attachments[0];
        return attachments.length && file.ext === 'webm';
    }

    return (
        <div className={classNames('message', {
            'message--isme' : isMe,
            'message--istyping' : isTyping,
            'message--isaudio' : isAudio(),
            'message--image' : !isAudio() && attachments && attachments.length === 1 && !text
        })}>
            <div className="message__content">
                <div className="message__avatar">
                    <Avatar user={user}/>
                </div>
                <div className="message__info">
                    {(text || isTyping) && (
                        <div className="message__bubble">
                            { text &&
                               isMe ? <Space wrap>
                                        <Popover content={
                                            <>
                                                <Button onClick={onRemoveMessage}>DELETE</Button>
                                            </>
                                        } 
                                          trigger="click">
                                            <p className="message__text">
                                            {reactStringReplace(text, /:(.+?):/g, (match, i) => (
                                                <em-emoji key={i} id={match}></em-emoji>
                                            ))}
                                            </p>
                                        </Popover>
                                       </Space>
                                    :
                                    <p className="message__text">
                                    {reactStringReplace(text, /:(.+?):/g, (match, i) => (
                                        <em-emoji key={i} id={match}></em-emoji>
                                    ))}
                                    </p>
                            }
                            { isTyping && <div className="message__typing">
                                <span/>
                                <span/>
                                <span/>
                            </div>}
                            
                        </div>
                    )}
                    { attachments && (
                        attachments.map(item => renderAttachmetsItems(item))
                    )}
                    { date && <div className="message__bot--info">
                        <span className='message__date'>
                            <Time date={date}/>
                        </span>
                        <IconReaded isMe={isMe} isReaded={isReaded}/>
                    </div>}
                </div>
                <IconReaded isMe={isMe} isReaded={isReaded}/>
            </div>
        </div>
    )
};

Message.defaultProps = {
    user: {}
};

Message.propTypes = {
    avatar: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.object,
    user: PropTypes.object,
    attachments: PropTypes.array,
    isTyping: PropTypes.bool,
    isMe: PropTypes.bool,
    isReaded: PropTypes.bool,
    audio: PropTypes.string,
};

export default Message;