import React from 'react';
import { Input } from 'antd';
import { Typography, Button } from 'antd';
const { Title } = Typography;

const NotesInput = () => {
    return (
        <div style={{ flex: 5 }}>
            <Title level={4} style={{ marginBottom: '16px' }}>Notes</Title>
            <Input.TextArea rows={8} style={{ width: '100%' }} />
        </div>
    );
};

export default NotesInput;
