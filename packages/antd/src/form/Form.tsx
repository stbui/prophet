import React, { Children } from 'react';
import { useDispatch } from 'react-redux';
import { goBack } from 'connected-react-router';
import { Form, Button } from 'antd';
import FormInput from './FormInput';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export const Create = props => {
    const { children, record, form, save } = props;

    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();

        form.validateFields((err, values) => {
            if (!err) {
                save(values);
            }
        });
    };

    const handleBackClick = () => {
        dispatch(goBack());
    };

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
};

export default Form.create()(Create);
