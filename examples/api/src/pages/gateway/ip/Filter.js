import React from 'react';
import { CreateButton } from '@stbui/prophet-antd';
import { Form, Input, Select, Row, Col, Button } from 'antd';

export const Filter = props => {
    const { basePath, hasCreate, filterValues, setFilters } = props;

    const [form] = Form.useForm();

    const onFinish = values => {
        setFilters(values);
    };

    const onReset = () => {
        setFilters({});
        form.resetFields();
    };

    return (
        <React.Fragment>
            <Form onFinish={onFinish} colon={false}>
                <Row gutter={[16, 0]}>
                    <Col span={8}>
                        <Form.Item
                            label="来源IP"
                            name="gatewayGroup"
                            initialValue={filterValues.gatewayGroup}
                        >
                            <Select placeholder="请选择">
                                <Select.Option value={1}>1</Select.Option>
                                <Select.Option value={1}>1</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="网关分组"
                            name="service"
                            initialValue={filterValues.service}
                        >
                            <Input placeholder="请输入" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="服务名"
                            name="path"
                            initialValue={filterValues.path}
                        >
                            <Input placeholder="请输入" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="请求方法"
                            name="method"
                            initialValue={filterValues.method}
                        >
                            <Input placeholder="请输入" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="appID"
                            name="pluginNames"
                            initialValue={filterValues.pluginNames}
                        >
                            <Input placeholder="请输入" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="API Path"
                            name="appEnabled"
                            initialValue={filterValues.appEnabled}
                        >
                            <Input placeholder="请输入" />
                        </Form.Item>
                    </Col>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" ghost htmlType="submit">
                            查询
                        </Button>
                        <Button style={{ marginLeft: 16 }} onClick={onReset}>
                            清空
                        </Button>
                    </Col>
                </Row>
            </Form>
            <div style={{ paddingBottom: 24 }}>
                {hasCreate ? <CreateButton basePath={basePath} /> : null}
            </div>
        </React.Fragment>
    );
};

export default Filter;
