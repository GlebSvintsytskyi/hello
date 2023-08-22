import React, { useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import dialogsActions from "../../redux/actions/dialogs";
import Status from "../../components/Status/insex";
import Dialog from "../../containers/Dialog";
import Messages from '../../containers/Message'
import SidebarCont from "../../containers/Sidebar";
import ChatInputCont from "../../containers/ChatInput";
import { logout } from '../../redux/reducers/users';

import './Home.scss'; 
import { useEffect } from "react";

const Home = ({ currentDialogId, setCurrentDialogId, history, items, user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const dialogId = history.location.pathname.split('/').pop();
        setCurrentDialogId(dialogId);
    }, [history.location.pathname]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
      };
      const handleOk = () => {
        dispatch( logout() );
        setIsModalOpen(false);
        navigate('/login');
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    
    return (
        <section className="home">
            <div className="chat">
                <div className="chat__sidebar">  
                    <SidebarCont/>
                    <div className="chat__sidebar-dialogs">
                        <Dialog/>
                    </div>
                </div>

                <div className="chat__dialogs">
                    <div className="chat__dialogs-header">
                        <div/>
                        <div className="chat__dialogs-header-center">
                        <b className="chat__dialogs-header-username">{user.fullname}</b>
                            <div className="chat__dialogs-header-status">
                                <Status online/>
                            </div>
                        </div>
                        <EllipsisOutlined className="chat__dialogs-header-btn" onClick={showModal}/>
                    </div>
                    <div className="chat__dialogs-messages">
                        { currentDialogId !== "im" && <Messages />}
                    </div>
                    <div className="chat__dialogs-input">
                        <ChatInputCont/>
                    </div>
                </div>
            </div> 
            <Modal title="Do you really want to leave ?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}/>
        </section>
    )
}

export default connect(({ dialogs, users }) => ({
    dialogs,
    user: users.data,
  }), dialogsActions)(Home);