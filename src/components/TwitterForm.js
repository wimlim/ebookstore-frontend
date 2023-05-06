import React from 'react';
import { Form, Input } from 'antd';

const TwitterForm = ({ twitter }) => {
    return (
        <Form layout="vertical">
            <Form.Item>
                <Input placeholder="Twitter Handle" value={twitter}/>
            </Form.Item>
        </Form>
    );
};

export default TwitterForm;
