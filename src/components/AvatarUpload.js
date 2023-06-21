import React, { useState } from 'react';
import { Typography, Avatar, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AvatarUpload = ({ user, src, onChange }) => {
    const [tempSrc, setTempSrc] = useState(null);

    const handleUpload = (info) => {
        if (info.file.status === 'uploading') {
            setTempSrc(URL.createObjectURL(info.file.originFileObj));
        }
        if (info.file.status === 'done') {
            onChange(info.file.originFileObj);
            setTempSrc(null);
            message.success('上传成功');
        }
        if (info.file.status === 'error') {
        }
    };

    const customRequest = ({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append('avatar', file);

        fetch(`http://localhost:8080/users/avatar/${user}`, {
            method: 'PUT',
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    onSuccess(response);
                } else {
                    throw new Error(response.statusText);
                }
            })
            .catch((error) => {
                onError(error);
            });
    };

    return (
        <div className="avatar-wrapper">
            <Title level={4}>头像</Title>
            <Avatar shape="square" size={128} src={tempSrc || src} style={{ marginBottom: '24px' }} />
            <Upload
                name="avatar"
                customRequest={customRequest}
                onChange={handleUpload}
            >
                <UploadOutlined /> 上传头像
            </Upload>
        </div>
    );
};

export default AvatarUpload;
