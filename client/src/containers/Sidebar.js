import React, { useState } from 'react';
import { connect } from 'react-redux';

import messagesActions from '../redux/actions/messages';
import Sidebar from '../components/Sidebar';
import { findUser } from '../utills/api/user';
import dialogsApi from '../utills/api/dialogs';

const SidebarCont = ({ authorId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectUserId, setSelectUserId] = useState(false);
    const [messageText, setMessageText] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
      };

    const handleChangeInput = value => {
      setInputValue(value);
    }

    const handleChangeMessage = e => {
      setMessageText(e.target.value);
    }

    const onSearch = (value) => {
      setIsLoading(true);
      findUser(value).then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
        .catch(() => setIsLoading(false));
    }

    const handleOk = () => {
      dialogsApi.create(authorId, selectUserId, messageText).then(() => 
          setIsLoading(true)
        )
        .catch(() => setIsLoading(false));
      setIsLoading(false);
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const onSelectUser = userId => {
      setSelectUserId(userId)
    }

    return (
      <Sidebar
        users={users}
        showModal={showModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        onChange={handleChangeInput}
        onChangeTextArea={handleChangeMessage}
        onSearch={onSearch}
        inputValue={inputValue}
        messageText={messageText}
        onSelectUser={onSelectUser}
        isLoading={isLoading}
      />
    );
  };
  
  export default connect(({ users }) => ({
    authorId: users.data._id
}), messagesActions
)(SidebarCont);