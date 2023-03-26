import React from 'react';
import { Typography, Avatar, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Title } = Typography;

const AvatarUpload = ({ src, onChange }) => {
    return (
        <div className="avatar-wrapper">
            <Title level={4}>Avatar</Title>
            <Avatar
                shape="square"
                size={128}
                src={src}
                style={{ marginBottom: '24px' }}
            />
            <Upload showUploadList={false} onChange={onChange}>
                <UploadOutlined /> Upload Avatar
            </Upload>
        </div>
    );
};

export default AvatarUpload;
