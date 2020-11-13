import React from 'react';
import { useLogin } from '@stbui/prophet-core';
import { Form, Input, Button } from 'antd';

const Login = () => {
    const login = useLogin();

    const onFinish = values => {
        login(values).catch(error => {
            console.log(error);
        });
    };

    return (
        <Form onFinish={onFinish} className="login-form">
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: '请输入用户名',
                    },
                ]}
            >
                <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入密码',
                    },
                ]}
            >
                <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    className="login-form-button"
                    htmlType="submit"
                >
                    登陆
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
