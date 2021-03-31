import React from 'react';
import { useLoading } from '@stbui/prophet-core';
import { Form, Button, Select, Input, Checkbox } from 'antd';

export const FormContainer = props => {
    const { record, save, onOk, onCancel } = props;
    const form = Form.useForm();

    const submitting = useLoading();

    const onFinish = values => {
        const requestParameters = JSON.parse(values.requestParameters);
        const serviceParameters = JSON.parse(values.serviceParameters);
        const newFields = {
            ...values,
            requestParameters,
            serviceParameters,
        };

        save(newFields);
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
        >
            <div style={{ fontSize: 16, marginBottom: 12, fontWeight: 700 }}>
                前端配置
            </div>
            <Form.Item
                label="API名称"
                name="apiName"
                initialValu={record.apiName}
                rules={[{ required: true, message: '请输入' }]}
            >
                <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
                label="前端类型"
                name="type"
                initialValue="http"
                rules={[{ required: true, message: '请输入' }]}
            >
                <Select placeholder="请输入">
                    <Select.Option value="http">http</Select.Option>
                    <Select.Option value="https">https</Select.Option>
                    <Select.Option value="websocket">websocket</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="路径"
                name="requestConfig.path"
                initialValue={
                    record.requestConfig ? record.requestConfig.path : undefined
                }
                rules={[{ required: true, message: '请输入' }]}
            >
                <Input placeholder="请输入"></Input>
            </Form.Item>
            <Form.Item
                label="请求方法"
                name="requestConfig.method"
                initialValue={
                    record.requestConfig
                        ? record.requestConfig.method
                        : undefined
                }
                rules={[{ required: true, message: '请输入' }]}
            >
                <Select placeholder="请输入">
                    <Select.Option value="GET">GET</Select.Option>
                    <Select.Option value="POST">POST</Select.Option>
                    <Select.Option value="PUT">PUT</Select.Option>
                    <Select.Option value="DELETE">DELETE</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="鉴权类型"
                name="requestConfig.auth"
                initialValue="无"
                rules={[{ required: true, message: '请输入' }]}
            >
                <Select placeholder="请输入">
                    <Select.Option value="jwt">jwt</Select.Option>
                    <Select.Option value="oauth">oauth</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="支持cors"
                name="requestConfig.encors"
                initialValue={false}
                valuePropName="checked"
            >
                <Checkbox placeholder="请输入"></Checkbox>
            </Form.Item>

            <Form.Item
                label="参数配置"
                name="requestParameters"
                initialValue={
                    record.requestParameters
                        ? JSON.stringify(record.requestParameters)
                        : undefined
                }
                rules={[{ required: true, message: '请输入' }]}
            >
                <Input.TextArea placeholder="请输入"></Input.TextArea>
            </Form.Item>

            <div style={{ fontSize: 16, marginBottom: 12, fontWeight: 700 }}>
                后端配置
            </div>

            <Form.Item
                label="后端类型"
                name="serviceType"
                initialValue={record.serviceType}
                rules={[{ required: true, message: '请输入' }]}
            >
                <Select placeholder="请输入">
                    <Select.Option value="http">http</Select.Option>
                    <Select.Option value="https">https</Select.Option>
                    <Select.Option value="websocket">websocket</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="后端地址"
                name="serviceConfig.url"
                initialValue={
                    record.serviceConfig ? record.serviceConfig.url : undefined
                }
                rules={[{ required: true, message: '请输入' }]}
            >
                <Input placeholder="请输入"></Input>
            </Form.Item>
            <Form.Item
                label="后端路径"
                name="serviceConfig.path"
                initialValue={
                    record.serviceConfig ? record.serviceConfig.path : undefined
                }
                rules={[{ required: true, message: '请输入' }]}
            >
                <Input placeholder="请输入"></Input>
            </Form.Item>
            <Form.Item
                label="请求方法"
                name="serviceConfig.method"
                initialValue={
                    record.serviceConfig
                        ? record.serviceConfig.method
                        : undefined
                }
                rules={[{ required: true, message: '请输入' }]}
            >
                <Select placeholder="请输入">
                    <Select.Option value="GET">GET</Select.Option>
                    <Select.Option value="POST">POST</Select.Option>
                    <Select.Option value="PUT">PUT</Select.Option>
                    <Select.Option value="DELETE">DELETE</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="后端超时"
                name="serviceTimeout"
                initialValue={record.serviceTimeout}
            >
                <Input placeholder="请输入"></Input>
            </Form.Item>
            <Form.Item
                label="参数配置"
                name="serviceParameters"
                initialValue={
                    record.serviceParameters
                        ? JSON.stringify(record.serviceParameters)
                        : undefined
                }
                rules={[{ required: true, message: '请输入' }]}
            >
                <Input.TextArea placeholder="请输入"></Input.TextArea>
            </Form.Item>

            <Form.Item label="常量配置" name="url" initialValue={record.url}>
                <Input.TextArea placeholder="请输入"></Input.TextArea>
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
