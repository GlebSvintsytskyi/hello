import React from "react";
import { TeamOutlined, FormOutlined, EllipsisOutlined } from '@ant-design/icons';
import Status from "../../components/Status/insex";
import Dialog from "../../containers/Dialog";
import Messages from '../../containers/Message'
import ChatInput from "../../components/ChatInput/ChatInput";

import './Home.scss'; 

const Home = () => {

    return (
        <section className="home">
            <div className="chat">
                <div className="chat__sidebar">
                    
                    <div className="chat__sidebar-header">
                        <div>
                            <TeamOutlined/>
                            <span>Current list</span>
                        </div>
                        <div>
                            <FormOutlined className="chat__sidebar-header-btn"/>
                        </div>
                    </div>  

                    <div className="chat__sidebar-dialogs">
                        <Dialog userId={0} />
                    </div>
                </div>

                <div className="chat__dialogs">
                    <div className="chat__dialogs-header">
                        <div/>
                        <div className="chat__dialogs-header-center">
                            <b className="chat__dialogs-header-username">Gleb Svintsytskyi</b>
                            <div className="chat__dialogs-header-status">
                                <Status online/>
                            </div>
                        </div>
                        <EllipsisOutlined className="chat__dialogs-header-btn"/>
                    </div>
                    <div className="chat__dialogs-messages">
                        <Messages />
                    </div>
                    <div className="chat__dialogs-input">
                        <ChatInput/>
                    </div>
                </div>
            </div>  
        </section>
    )
}

export default Home;