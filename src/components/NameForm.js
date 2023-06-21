import React from 'react';
import { Form, Input } from 'antd';

const NameForm = ({ firstname, lastname, onChange }) => {
    const handleFirstnameChange = (e) => {
        onChange(e.target.value, lastname);
    };

    const handleLastnameChange = (e) => {
        onChange(firstname, e.target.value);
    };

    return (
        <Form layout="inline">
            <Form.Item style={{ flex: 1 }}>
                <Input placeholder="First Name" value={firstname} onChange={handleFirstnameChange} />
            </Form.Item>
            <Form.Item style={{ flex: 1 }}>
                <Input placeholder="Last Name" value={lastname} onChange={handleLastnameChange} />
            </Form.Item>
        </Form>
    );
};

export default NameForm;
