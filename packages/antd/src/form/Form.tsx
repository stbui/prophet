import React, { Children } from 'react';
import { useHistory } from 'react-router-dom';

import { Form, Button } from 'antd';
import FormInput from './FormInput';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
    },
};

export default Form.create()((props: any) => {
    const { children, record, form, save } = props;

    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();

        form.validateFields((err, values) => {
            if (!err) {
                save(values);
            }
        });
    };

    const handleBackClick = () => history.goBack();

    return (
        <Form onSubmit={handleSubmit} {...formItemLayout}>
            {Children.map(children, input => (
                <FormInput record={record} input={input} form={form} />
            ))}
            <FormItem {...tailFormItemLayout}>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: 16 }}
                >
                    提交
                </Button>
                <Button onClick={handleBackClick}>返回</Button>
            </FormItem>
        </Form>
    );
});
