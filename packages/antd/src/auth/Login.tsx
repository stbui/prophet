import React from 'react';
import { useLogin } from '@stbui/prophet-core';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

const Login = props => {
    const { getFieldDecorator, validateFields } = props.form;
    const login = useLogin();

    const handleSubmit = () =>
        validateFields((err, values) => {
            if (!err) {
                login(values).catch(error => {
                    console.log(error);
                });
            }
        });

    return (
        <Form className="login-form">
            <FormItem>
                {getFieldDecorator('username', {
                    rules: [
                        {
                            required: true,
                            message: '请输入用户名',
                        },
                    ],
                })(
                    <Input
                        prefix={
                            <Icon
                                type="user"
                                style={{ color: 'rgba(0,0,0,.25)' }}
                            />
                        }
                        placeholder="Username"
                    />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password', {
                    rules: [
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ],
                })(
                    <Input
                        prefix={
                            <Icon
                                type="lock"
                                style={{ color: 'rgba(0,0,0,.25)' }}
                            />
                        }
                        type="password"
                        placeholder="Password"
                    />
                )}
            </FormItem>
            <FormItem>
                <Button
                    type="primary"
                    className="login-form-button"
                    onClick={handleSubmit}
                >
                    登陆
                </Button>
            </FormItem>
        </Form>
    );
};

export default Form.create()(Login);
