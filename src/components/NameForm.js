import React from 'react';
import { Form, Input } from 'antd';

const NameForm = () => {
    return (
        <Form layout="inline">
            <Form.Item style={{ flex: 1 }}>
                <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item style={{ flex: 1 }}>
                <Input placeholder="Last Name" />
            </Form.Item>
        </Form>
    );
};

export default NameForm;
