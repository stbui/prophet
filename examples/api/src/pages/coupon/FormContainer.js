import React from 'react';
import { useLoading } from '@stbui/prophet-core';
import { Form, Button, Select, Input, Checkbox } from 'antd';

export const FormContainer = props => {
    const { record, save, onOk, onCancel } = props;

    const submitting = useLoading();

    const onFinish = values => {
        save(values);
    };

    return (
        <Form
            onFinish={onFinish}
            colon={false}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
        >
            <div style={{ fontSize: 16, marginBottom: 12, fontWeight: 700 }}>
                前端配置
            </div>
            <Form.Item
                label="路径规则"
                name="path"
                initialValue={record.path}
                rules={[{ required: true, message: '请输入' }]}
            >
                <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
                label="后端服务"
                name="url"
                initialValue={record.url}
                rules={[{ required: true, message: '请输入' }]}
            >
                <Input placeholder="请输入" />
            </Form.Item>

            <Form.Item label="环境" name="env" initialValue={record.env}>
                <Input placeholder="请输入" />
            </Form.Item>

            <div>
                <Button
                    type="primary"
                    htmlType="submit"
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
