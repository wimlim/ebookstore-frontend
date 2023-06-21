import React, { useState } from 'react';
import { Typography, Avatar, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Title } = Typography;

const AvatarUpload = ({ src, onChange }) => {
    const [tempSrc, setTempSrc] = useState(null);

    const handleUpload = (info) => {
        if (info.file.status === 'uploading') {
            // 在图片上传过程中显示临时预览图像
            setTempSrc(URL.createObjectURL(info.file.originFileObj));
        }
        if (info.file.status === 'done') {
            // 使用上传的图片文件更新状态
            onChange(info.file.originFileObj);
            setTempSrc(null); // 清除临时预览图像
            message.success('图片上传成功');
        }
        if (info.file.status === 'error') {
            message.error('图片上传失败');
        }
    };

    return (
        <div className="avatar-wrapper">
            <Title level={4}>头像</Title>
            <Avatar shape="square" size={128} src={tempSrc || src} style={{ marginBottom: '24px' }} />
            <Upload
                name="avatar"
                action="http://localhost:8080/users/uploadAvatar"
                method="POST"
                onChange={handleUpload}
            >
                <UploadOutlined /> 上传头像
            </Upload>
        </div>
    );
};

export default AvatarUpload;
