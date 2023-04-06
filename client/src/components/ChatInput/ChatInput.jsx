import React, { useState } from 'react';

import { SmileOutlined, CameraOutlined, AudioOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { message, Upload } from 'antd';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import './ChatInput.scss';

const props = {
    accept: '.jpg, .jpeg, .png, .gif',
    multiple: 'multiple',
    beforeUpload(file) {
      console.log(file)
    }
  };

const ChatInput = () => {
    const [value, setValue] = useState('');
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

    return(
        <div className='chat-input'>
        <div className='chat-input__smile-btn'>
            { emojiPickerVisible && <div className="chat-input__emoji-picker">
                <Picker data={data} />
            </div>}
            <SmileOutlined onClick={() => setEmojiPickerVisible(!emojiPickerVisible)} /> 
        </div>
        <Input onChange={e => setValue(e.target.value)} size="large" placeholder="Input your messages"/>
        <div className='chat-input__actions'>
            <Upload {...props}>
                <CameraOutlined type='file' style={{fontSize:'18px', cursor:'pointer'}} />
            </Upload>
            { value ? <RightCircleOutlined style={{cursor:'pointer'}} /> : <AudioOutlined style={{cursor:'pointer'}} />}   
        </div>
    </div>
    )
}
 
export default ChatInput;