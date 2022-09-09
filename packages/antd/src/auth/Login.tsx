import React from 'react';
import { useLogin } from '@stbui/prophet-core';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';

const Root = styled.div`
    display: flex;
    height: 100vh;

    .login-cover {
        flex: 1;
    }

    .login-img {
        height: 100%;
        flex-direction: column;
        box-sizing: border-box;
        display: flex;
        max-width: 100%;
        place-content: center;
        align-items: center;
    }

    .login-content {
        flex: 1;
        padding: 70px 60px;
        border-left: 1px solid #d9ddf6;
        background: #f3fcff;

        box-shadow: 0 7px 8px -4px rgb(0 0 0 / 20%),
            0 12px 17px 2px rgb(0 0 0 / 14%), 0 5px 22px 4px rgb(0 0 0 / 12%);
    }

    .login-title {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 8px;
    }

    .other-login {
        color: #a1a6a8;
        padding: 50px 0 60px;
    }
`;

const Login = () => {
    const login = useLogin();

    const onFinish = values => {
        login(values).catch(error => {
            console.log(error);
        });
    };

    return (
        <Root className="login">
            <div className="login-cover">
                <div className="login-img">
                    <img src="https://stbui.oss-cn-beijing.aliyuncs.com/angular-material-app/assets/images/signin.svg" />
                </div>
            </div>
            <div className="login-content">
                <div className="login-title">用户登录</div>
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
                        <Input placeholder="请输入用户名" />
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
                        <Input type="password" placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            className="login-form-button"
                            htmlType="submit"
                            block
                        >
                            登陆
                        </Button>
                    </Form.Item>
                </Form>
                <div className="other-login">其他方式登陆</div>
            </div>
        </Root>
    );
};

export default Login;
