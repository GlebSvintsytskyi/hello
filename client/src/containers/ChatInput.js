import React, { useState, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import fileApi from '../utills/api/file';

import messagesActions from '../redux/actions/messages';
import ChatInput from '../components/ChatInput/index.jsx';

const mimeType = "audio/mp3";

const ChatInputCont = ({ fetchSendMessage }) => {
	const currentDialogId = useSelector(state => state.dialogs.currentDialogId);

 	const [isPermission, setIsPermission] = useState(false);

  	const mediaRecorder = useRef(null);

	const [recordingStatus, setRecordingStatus] = useState("inactive");

	const [stream, setStream] = useState(null);

	const [audio, setAudio] = useState(null);

	const [audioChunks, setAudioChunks] = useState([]);

	const [file, setFile] = useState(null);


  const getMicrophonePermission = async () => {
		if ("MediaRecorder" in window) {
			try {
				const mediaStream = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				});
				setIsPermission(true);
				setStream(mediaStream);
			} catch (err) {
				alert(err.message);
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};

	const startRecording = async () => {
		setRecordingStatus("recording");
		const media = new MediaRecorder(stream, { type: 'audio/mp3' });

		mediaRecorder.current = media;

		mediaRecorder.current.start();

		let localAudioChunks = [];

		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			const file = new File([event.data], mimeType);
			setFile(file);
			localAudioChunks.push(event.data);
		};

		setAudioChunks(localAudioChunks);
	};

	const stopRecording = () => {
		setRecordingStatus("inactive");
		mediaRecorder.current.stop();

		mediaRecorder.current.onstop = () => {
			const audioBlob = new Blob(audioChunks, { type: mimeType });
			const audioUrl = URL.createObjectURL(audioBlob);

			setAudio(audioUrl);

			setAudioChunks([]);
		};
	};

	const sendAudioMessage = () => {
		const value = null;
			fileApi.upload(file).then(({ data }) => {
				fetchSendMessage(value, currentDialogId, data.fileObj._id);
			})
	}

  const handleFinishRecording = () => {
    setIsPermission(false);
	setAudio(null);
  }
  
    return (
      <ChatInput
        onSendMessage={fetchSendMessage}
        microphonePermission={getMicrophonePermission}
        startRecording={startRecording}
        stopRecording={stopRecording}
        exit={handleFinishRecording}
		sendAudioMessage={sendAudioMessage}
        isPermission={isPermission}
        recordingStatus={recordingStatus}
        audio={audio}
      />
    );
  };
  
  export default connect(({ dialogs }) => dialogs, messagesActions)(ChatInputCont);
