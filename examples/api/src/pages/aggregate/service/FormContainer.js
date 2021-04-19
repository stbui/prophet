import React from 'react';
import { useLoading } from '@stbui/prophet-core';
import { Form, Button, Select, Input, Radio, Checkbox } from 'antd';

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
            <Form.Item label="网关分组" name="gatewayGroup">
                <Select placeholder="请选择">
                    <Select.Option value={1}>1</Select.Option>
                    <Select.Option value={1}>1</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label="路由类型" name="proxyMode">
                <Radio.Group>
                    <Radio value={1}>服务编排</Radio>
                    <Radio value={2}>服务发现</Radio>
                    <Radio value={3}>反向代理</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="访问" name="appEnabled">
                <Radio.Group>
                    <Radio value={1}>允许</Radio>
                    <Radio value={2}>禁用</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label="后端服务名" name="backendService">
                <Select placeholder="请选择">
                    <Select.Option value={1}>1</Select.Option>
                    <Select.Option value={1}>1</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="后端API路径"
                name="backendPath"
                rules={[{ required: true, message: '请输入' }]}
                help="路由转发目标路径，支持精确匹配和引用前端API路径的变量 (规则说明) ，如：/a/b/c 或 /a/b/{$1}"
            >
                <Input placeholder="请输入" />
            </Form.Item>

            <Form.Item
                label="前端服务名"
                name="service"
                rules={[{ required: true, message: '请输入' }]}
                help="服务名为访问URL其中一级路径，建议与后端服务名一致"
            >
                <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
                label="调用方"
                name="service"
                rules={[{ required: true, message: '请输入' }]}
                help="限制调用方访问，请求URL需在请求头中加应用授权 (示例)，不启用不限制"
            >
                <Checkbox placeholder="请输入">启用</Checkbox>
            </Form.Item>

            <Form.Item label="请求方法" name="method">
                <Select placeholder="请选择">
                    <Select.Option value={1}>1</Select.Option>
                    <Select.Option value={1}>1</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label="路由结果" name="reslut">
                <Input placeholder="请输入" readOnly />
            </Form.Item>

            <div>
                提示：网关访问地址格式为:
                http://网关ip:网关port/proxy/前端服务名/前端API路径
            </div>

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
