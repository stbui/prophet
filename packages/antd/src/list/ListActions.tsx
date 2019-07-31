import React from 'react';
import { CreateButton } from 'prophet-antd';
import { Form, Input, Button } from 'antd';

export const ListActions = props => {
    const {
        basePath,
        hasCreate,
        filterValues,
        setFilters,
        form: { getFieldDecorator, validateFields },
        field,
    } = props;

    const handleSearch = () =>
        validateFields((err, values) => {
            if (!err) {
                setFilters(values);
            }
        });

    const handleInputChange = ({ target: { value } }) => {
        if (value === '') {
            setFilters({});
        }
    };

    return (
        <div
            style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}
        >
            <Form layout="inline">
                <Form.Item>
                    {getFieldDecorator(field, {
                        initialValue: filterValues[field],
                    })(
                        <Input
                            placeholder="请输入"
                            style={{ width: 300 }}
                            allowClear
                            onChange={handleInputChange}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleSearch}>
                        查询
                    </Button>
                </Form.Item>
            </Form>
            <span style={{ flex: 'auto' }} />
            {hasCreate ? <CreateButton basePath={basePath} /> : null}
        </div>
    );
};

ListActions.defaultProps = {
    field: 'q',
};

export default Form.create()(ListActions);
