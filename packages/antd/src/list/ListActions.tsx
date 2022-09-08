import React, { FunctionComponent } from 'react';
import { useTranslate } from '@stbui/prophet-core';
import { CreateButton } from '../button';
import { Form, Input, Button } from 'antd';

interface Props {
    hasCreate?: boolean;
    filterValues?: any;
    setFilters?: any;
    field?: any;
}

export const ListActions: FunctionComponent<Props> = ({
    hasCreate,
    filterValues,
    setFilters,
    field,
}) => {
    const translate = useTranslate();

    const onFinish = values => {
        setFilters(values);
    };

    const handleInputChange = ({ target: { value } }) => {
        if (value === '') {
            setFilters({});
        }
    };

    return (
        <div
            style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}
        >
            <Form onFinish={onFinish} layout="inline">
                <Form.Item name={field} initialValue={filterValues[field]}>
                    <Input
                        placeholder="请输入"
                        style={{ width: 300 }}
                        allowClear
                        onChange={handleInputChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {translate('prophet.action.search')}
                    </Button>
                </Form.Item>
            </Form>
            <span style={{ flex: 'auto' }} />
            {hasCreate ? <CreateButton /> : null}
        </div>
    );
};

ListActions.defaultProps = {
    field: 'q',
};

export default ListActions;
