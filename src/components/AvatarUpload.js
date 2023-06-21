import React, { useState } from 'react';
import { Typography, Avatar, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Title } = Typography;

const AvatarUpload = ({ src, onChange }) => {
    const [tempSrc, setTempSrc] = useState(null);

    const handleUpload = (info) => {
        if (info.file.status === 'done') {
            const newSrc = URL.createObjectURL(info.file.originFileObj);
            setTempSrc(newSrc);
            onChange(info.file.originFileObj);
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    return (
        <div className="avatar-wrapper">
            <Title level={4}>Avatar</Title>
            <Avatar shape="square" size={128} src={tempSrc ? tempSrc : src} style={{ marginBottom: '24px' }} />
            <Upload
                name="avatar"
                action="http://localhost:8080/users/uploadAvatar"
                method="POST"
                onChange={handleUpload}
            >
                <UploadOutlined /> Upload Avatar
            </Upload>
        </div>
    );
};

export default AvatarUpload;
