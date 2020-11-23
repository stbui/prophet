import React, { cloneElement, FunctionComponent } from 'react';
import { useCreateController } from '@stbui/prophet-core';
import { Spin } from 'antd';

interface Props {
    children: any;
    resource?: string;
    basePath?: string;
    title?: string;
    loading?: any;
    actions?: any;
    record?: object;
    save?: any;
}

export const CreateView: FunctionComponent<Props> = ({
    resource,
    basePath,
    children,
    title,
    loading,
    record = {},
    save,
    actions,
    ...other
}) => (
    <Spin spinning={loading}>
        {actions && cloneElement(actions, { ...other })}
        {cloneElement(children, {
            resource,
            basePath,
            record,
            save,
            ...other,
        })}
    </Spin>
);

const Create = props => (
    <CreateView {...props} {...useCreateController(props)} />
);

export default Create;
