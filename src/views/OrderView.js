import React, { useState } from 'react';
import { Typography, Form, Input, Avatar, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import '../css/profile.css';

const { Title } = Typography;

const ProfileView = () => {
    const handleAvatarChange = () => {
    };

    const handleSave = () => {
    };

    const handleCancel = () => {
    };

    return (
        <div className="profile-view">
            <Title level={1}>My Profile</Title>
            <Title level={4}>Name</Title>
            <Form layout="inline">
                <Form.Item style={{ flex: 1 }}>
                    <Input />
                </Form.Item>
                <Form.Item style={{ flex: 1 }}>
                    <Input />
                </Form.Item>
            </Form>

            <Title level={4}>Twitter</Title>
            <Form layout="vertical">
                <Form.Item>
                    <Input />
                </Form.Item>
            </Form>

            <Form layout="inline">
                <div className="avatar-wrapper">
                    <Title level={4}>Avatar</Title>
                    <Avatar
                        shape="square"
                        size={128}
                        src={require("../assets/avatar.jpg")}
                        style={{ marginBottom: '24px' }}
                    />
                    <Upload showUploadList={false} onChange={handleAvatarChange}>
                        <UploadOutlined /> Upload Avatar
                    </Upload>
                </div>

                <div style={{ flex: 5 }}>
                    <Title level={4} style={{ marginBottom: '16px' }}>Notes</Title>
                    <Input.TextArea rows={8} style={{ width: '100%' }} />
                </div>
            </Form>
            <div className="button-wrapper">
                <Button type="primary" onClick={handleSave}>Save</Button>
                <Button style={{ marginLeft: '8px' }} onClick={handleCancel}>Cancel</Button>
            </div>
        </div>
    );
};

export default ProfileView;
