import React, { useState } from 'react';
import { Typography, Button, Form } from 'antd';
import NameForm from '../components/NameForm';
import TwitterForm from '../components/TwitterForm';
import AvatarUpload from '../components/AvatarUpload';
import NotesInput from '../components/NotesInput';
import '../css/profile.css';

const { Title } = Typography;

const ProfileView = () => {
    const [avatarSrc, setAvatarSrc] = useState(require("../assets/avatar.jpg"));

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
            <NameForm />

            <Title level={4}>Twitter</Title>
            <TwitterForm />

            <Form layout="inline">
                <AvatarUpload src={avatarSrc} onChange={handleAvatarChange} />
                <NotesInput />
            </Form>
            <div className="button-wrapper">
                <Button type="primary" onClick={handleSave}>Save</Button>
                <Button style={{ marginLeft: '8px' }} onClick={handleCancel}>Cancel</Button>
            </div>
        </div>
    );
};

export default ProfileView;