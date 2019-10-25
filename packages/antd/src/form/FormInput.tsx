import React from 'react';
import { Form } from 'antd';

export interface IProps {
    form: any;
    input?: any;
    record?: any;
}

const FormInput = ({ form, input, record, ...other }: IProps) => {
    const { getFieldDecorator } = form;

    return input ? (
        <Form.Item label={input.props.label} {...other}>
            {input.props.name
                ? getFieldDecorator(input.props.name, {
                      initialValue: record[input.props.name],
                      rules: input.props.rules,
                  })(input)
                : input}
        </Form.Item>
    ) : null;
};

export default FormInput;
