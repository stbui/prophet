import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { CreateButton } from '../button';

export class ListActions extends Component<any> {
    static defaultProps = {
        field: 'q',
    };

    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.props.setFilters(values);
        });
    };

    handleInputChange = ({ target: { value } }) => {
        if (value === '') {
            this.props.setFilters({});
        }
    };

    render() {
        const {
            form: { getFieldDecorator },
            filterValues,
            basePath,
            field,
            hasCreate,
        } = this.props;

        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 24,
                }}
            >
                <Form onSubmit={this.handleSearch} layout="inline">
                    <Form.Item>
                        {getFieldDecorator(field, {
                            initialValue: filterValues[field],
                        })(
                            <Input
                                placeholder="请输入"
                                style={{ width: 300 }}
                                allowClear
                                onChange={this.handleInputChange}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Form.Item>
                </Form>
                <span style={{ flex: 'auto' }} />
                {hasCreate ? <CreateButton basePath={basePath} /> : null}
            </div>
        );
    }
}

export default Form.create()(ListActions);
