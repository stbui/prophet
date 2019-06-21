import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { CreateButton } from '../button';

export class ListActions extends Component<any> {
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.setFilters(values);
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      filterValues,
      basePath
    } = this.props;

    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <Form onSubmit={this.handleSearch} layout="inline">
          <Form.Item>
            {getFieldDecorator('q', {
              initialValue: filterValues.q
            })(<Input placeholder="请输入" style={{ width: 300 }} />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
        <span style={{ flex: 'auto' }} />
        <CreateButton basePath={basePath} />
      </div>
    );
  }
}

export default Form.create()(ListActions);
