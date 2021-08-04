import React, { cloneElement } from 'react';
import { Spin } from 'antd';

interface CreateViewProps {
    resource: string;
    basePath: string;
    loading?: any;
    actions?: any;
    record?: object;
    [key: string]: any;
}

export const CreateView = ({
    children,
    loading,
    record = {},
    actions,
    ...reset
}: CreateViewProps) => (
    <Spin spinning={loading}>
        {actions && cloneElement(actions, { ...reset })}
        {cloneElement(children, {
            record,
            ...reset,
        })}
    </Spin>
);

export default CreateView;
