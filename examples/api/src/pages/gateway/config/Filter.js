import React from 'react';
import { CreateButton } from '@stbui/prophet-antd';
import { Form, Input } from 'antd';

export const Filter = props => {
    const { basePath, hasCreate, filterValues, setFilters } = props;

    const onFinish = values => {};

    return (
        <div>
            API 网关配置
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 24,
                }}
            >
                <Form onFinish={onFinish} layout="inline" colon={false}>
                    <Form.Item
                        label="API名称"
                        name="apiName"
                        initialValue={filterValues.apiName}
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>

                    <Form.Item></Form.Item>
                </Form>
                <span style={{ flex: 'auto' }} />
                {hasCreate ? <CreateButton basePath={basePath} /> : null}
            </div>
        </div>
    );
};

export default Filter;
