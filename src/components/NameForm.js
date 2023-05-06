import React from 'react';
import { Form, Input } from 'antd';

const NameForm = ({ firstname, lastname }) => {
    return (
        <Form layout="inline">
            <Form.Item style={{ flex: 1 }}>
                <Input placeholder="First Name" value={firstname} />
            </Form.Item>
            <Form.Item style={{ flex: 1 }}>
                <Input placeholder="Last Name" value={lastname} />
            </Form.Item>
        </Form>
    );
};

export default NameForm;