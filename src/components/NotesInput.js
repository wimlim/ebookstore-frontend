import React from 'react';
import { Input } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

const NotesInput = ({ notes, onChange }) => {
    const handleNotesChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div style={{ flex: 5 }}>
            <Title level={4} style={{ marginBottom: '16px' }}>Notes</Title>
            <Input.TextArea rows={8} style={{ width: '100%' }} value={notes} onChange={handleNotesChange} />
        </div>
    );
};

export default NotesInput;
