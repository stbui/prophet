import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import { CreateButton } from '../button';

const FormItem = Form.Item;

export class ListActions extends Component<any> {
  static propTypes = {};
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.setFilters(values);
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      basePath,
      filterValues
    } = this.props;

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CreateButton basePath={basePath} />
        <span style={{ flex: 'auto' }} />
        <Form onSubmit={this.handleSearch} layout="inline">
          <FormItem>
            {getFieldDecorator('q', {
              initialValue: filterValues.q
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form>
      </div>
    );
  }
}

export default Form.create()(ListActions);
