import React from 'react';
import { TeamOutlined, FormOutlined } from '@ant-design/icons';
import { Icon, Button, Modal, Select, Input, Form } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const Sidebar = ({ 
    users, 
    showModal, 
    isModalOpen, 
    inputValue, 
    handleOk, 
    handleCancel, 
    onSearch, 
    onChangeInput, 
    onSelectUser,
    isLoading,
    onChangeTextArea,
    messageText
}) => {
    const options = users.map(user => <Option key={user._id}>{user.fullname}</Option>);

    return (
        <div className="chat__sidebar-header">
            <div>
                <TeamOutlined/>
                <span>Current list</span>
            </div>
            <div>
                <FormOutlined className="chat__sidebar-header-btn" onClick={showModal} />
            </div>
            <Modal 
                title="Basic Modal" 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}
                confirmLoading={isLoading}
            >
            <Form className="add-dialog-form">
          <Form.Item label="Введите имя пользователя или E-Mail">
            <Select
              value={inputValue}
              onSearch={onSearch}
              onChange={onChangeInput}
              onSelect={onSelectUser}
              notFoundContent={null}
              style={{ width: '100%' }}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              placeholder="Введите имя пользователя или почту"
              optionFilterProp="children"
              showSearch>
              {options}
            </Select>
          </Form.Item>
          <Form.Item label="Введите текст сообщения">
              <TextArea
                autosize={{ minRows: 3, maxRows: 10 }}
                onChange={onChangeTextArea}
                value={messageText}
              />
            </Form.Item>
          </Form>
            </Modal>
        </div>
    )
}

export default Sidebar;

