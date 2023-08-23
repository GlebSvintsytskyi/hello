import React, { useState } from 'react';

import { SmileOutlined, CameraOutlined, AudioOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Upload, Input, Button } from 'antd';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useSelector } from 'react-redux';

import fileApi from '../../utills/api/file';

import './ChatInput.scss';

const ChatInput = ( { onSendMessage, audio, microphonePermission, startRecording, stopRecording, exit, isPermission, recordingStatus, sendAudioMessage } ) => {

    const [value, setValue] = useState('');
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const currentDialogId = useSelector(state => state.dialogs.currentDialogId);

    const props = {
        accept: '.jpg, .jpeg, .png, .gif, .mp3',
        multiple: 'multiple',
        beforeUpload(file) {
            onSelectedFiles(file);
          }
      };

    const handleSendMessage = (e) => {
        if (e.keyCode === 13) {
            onSendMessage(value, currentDialogId);
            setValue('');
        }
    }

    const addEmoji = ({ shortcodes }) => {
        setValue((value + ' ' + shortcodes).trim());
    }

    const onSelectedFiles = async (file) => {
        const { data } = await fileApi.upload(file);
        await onSendMessage(value, currentDialogId, data.fileObj._id);
    }

    if(currentDialogId) {
        return(
                <div className='chat-input'>
                    <div className='chat-input__smile-btn'>
                        { emojiPickerVisible && <div className="chat-input__emoji-picker">
                            <Picker 
                                data={data}
                                onEmojiSelect={(emojiTag) => addEmoji(emojiTag)}
                            />
                        </div>}
                        { !isPermission && <SmileOutlined onClick={() => setEmojiPickerVisible(!emojiPickerVisible)} />} 
                    </div>
                    {  !isPermission && <Input 
                        onChange={e => setValue(e.target.value)}
                        onKeyUp={handleSendMessage}
                        value={value}
                        size="large" 
                        placeholder="Input your messages"
                    />}
                    <div className='chat-input__actions'>
                        { !isPermission && <Upload {...props} key="images" name='images'>
                            <CameraOutlined type='file' style={{fontSize:'18px', cursor:'pointer'}}/>
                        </Upload>}
                        { value && <RightCircleOutlined style={{cursor:'pointer'}} /> } 
                        { !isPermission && <AudioOutlined style={{cursor:'pointer'}} onClick={microphonePermission} /> }
                    </div>
                    {audio ? (
                        <div className="chat-input__audio-player">
                            <audio src={audio} controls></audio>
                        </div>
				    ) : null}
                    {isPermission && recordingStatus === "inactive" ? (
						<Button type="default" size='small' onClick={startRecording}>
							Start Recording
						</Button>
					) : null}
					{isPermission && recordingStatus === "recording" ? (
						<Button type="default" size='small' onClick={stopRecording}>
							Stop Recording
						</Button>
					) : null}
                    {isPermission ? (
						<Button type="default" size='small' onClick={exit}>
							Cancel
						</Button>
					) : null}
                     {isPermission ? (
						<Button type="default" size='small' onClick={sendAudioMessage}>
							Send
						</Button>
					) : null}
            </div>
        )
    }
}


export default ChatInput;