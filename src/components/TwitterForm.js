import React from 'react';
import { Form, Input } from 'antd';

const TwitterForm = ({ twitter, onChange }) => {
    const handleTwitterChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <Form layout="vertical">
            <Form.Item>
                <Input placeholder="Twitter Handle" value={twitter} onChange={handleTwitterChange} />
            </Form.Item>
        </Form>
    );
};

export default TwitterForm;
