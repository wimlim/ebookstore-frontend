import React from 'react';
import { Form, Input } from 'antd';

const TwitterForm = () => {
    return (
        <Form layout="vertical">
            <Form.Item>
                <Input placeholder="Twitter Handle" />
            </Form.Item>
        </Form>
    );
};

export default TwitterForm;
