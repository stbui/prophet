import React, { Component, Children } from 'react';
import { Form, Button } from 'antd';
import FormInput from './FormInput';
const FormItem = Form.Item;

export interface IProps {
  children?: any;
  form?: any;
  history?: any;
  basePath?: any;
  resource?: any;
  record?: any;
  save?(data, redirect): any;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

export class Create extends Component<IProps, any> {
  handleSubmit = e => {
    e.preventDefault();

    const { form, save, history } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        save(values, 'list');
        history.go(-1);
      }
    });
  };

  handleBackClick = () => {
    const { history } = this.props;
    history.go(-1);
  };

  render() {
    const { children, record } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {Children.map(children, input => (
          <FormInput
            record={record}
            input={input}
            form={this.props.form}
            {...formItemLayout}
          />
        ))}
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 16 }}>
            提交
          </Button>
          <Button onClick={this.handleBackClick}>返回</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Create as any);
