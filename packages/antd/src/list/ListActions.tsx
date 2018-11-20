import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import 'antd/lib/form/style/index.css';
import 'antd/lib/select/style/index.css';

const FormItem = Form.Item;
const { Option } = Select;

export class ListActions extends Component<any> {
  static propTypes = {};
  handleSearch = () => {};
  handleFormReset = () => {};

  render() {
    const {
      children,
      form: { getFieldDecorator },
      ...other
    } = this.props;

    return (
      <div>
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="姓名">
                {getFieldDecorator('name')(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24} />
            <Col md={8} sm={24} />
            <Col md={8} sm={24}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create()(ListActions);
