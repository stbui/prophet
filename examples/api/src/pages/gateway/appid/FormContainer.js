import React from 'react';
import { useLoading } from '@stbui/prophet-core';
import { Form, Button, Input } from 'antd';

export const FormContainer = props => {
    const { record, save, onOk, onCancel } = props;
    const form = Form.useForm();

    const submitting = useLoading();

    const onFinish = values => {
        save(values);
    };

    const handleSubmit = () => {
        form.submit();
    };

    return (
        <Form
            onFinish={onFinish}
            colon={false}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValuees={record}
        >
            <Form.Item
                label="插件名称"
                name="engName"
                rules={[{ required: true, message: '请输入' }]}
                help="插件名称由英文字母、下划线或数字组成, 不能以数字开头，如：memberAuth, member_auth_v1"
            >
                <Input placeholder="请输入" />
            </Form.Item>

            <Form.Item label="插件描述" name="chnName">
                <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
                label="默认执行顺序"
                name="order"
                rules={[{ required: true, message: '请输入' }]}
            >
                <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
                label="表单定义"
                name="config"
                rules={[{ required: true, message: '请输入' }]}
                help="路由级别的自定义属性，定义规范请参考： "
            >
                <Input placeholder="请输入" />
            </Form.Item>

            <Form.Item
                label="自定义配置"
                name="fixedConfig"
                help="插件级别的自定义配置信息"
            >
                <Input placeholder="请输入" />
            </Form.Item>

            <div style={{ marginTop: 24 }}>
                <Button
                    type="primary"
                    onClick={handleSubmit}
                    style={{ marginRight: 12 }}
                    loading={submitting}
                >
                    提交
                </Button>
                <Button onClick={onCancel}>取 消</Button>
            </div>
        </Form>
    );
};

export default FormContainer;
