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
            initialValues={record}
        >
            <Form.Item
                label="分组ID"
                name="groupId"
                rules={[{ required: true, message: '请输入' }]}
            >
                <Input placeholder="请输入" />
            </Form.Item>

            <Form.Item
                label="分组名称"
                name="groupName"
                rules={[{ required: true, message: '请输入' }]}
            >
                <Input placeholder="请输入" />
            </Form.Item>

            <Form.Item
                label="网关实例IP"
                name="instanceIps"
                rules={[{ required: true, message: '请输入' }]}
            >
                <Input placeholder="请输入" />
            </Form.Item>

            <div>
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
