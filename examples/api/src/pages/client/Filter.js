import React from 'react';
import { CreateButton } from '@stbui/prophet-antd';
import { Form, Input, Typography } from 'antd';

export const Filter = props => {
    const { basePath, hasCreate, filterValues, setFilters } = props;

    const onFinish = values => {};

    return (
        <div>
            <Typography.Title level={3}>客户端配置</Typography.Title>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 24,
                }}
            >
                <Form onFinish={onFinish} layout="inline" colon={false}>
                    <Form.Item
                        label="名称"
                        name="name"
                        initialValue={filterValues.name}
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
