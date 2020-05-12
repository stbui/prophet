import React, { cloneElement, FunctionComponent } from 'react';
import { useCreateController } from '@stbui/prophet-core';
import { Card } from 'antd';

interface Props {
    children?: any;
    resource?: any;
    basePath?: any;
    title?: string;
    loading?: any;
    actions?: any;
    record?: any;
    save?: any;
}

export const CreateView: FunctionComponent<Props> = props => {
    const {
        resource,
        basePath,
        children,
        title,
        loading,
        record = {},
        save,
        actions,
        ...other
    } = props;

    return (
        <Card bordered={false} title={title} loading={loading}>
            {actions && cloneElement(actions, { ...other })}
            {cloneElement(children, {
                resource,
                basePath,
                record,
                save,
                ...other,
            })}
        </Card>
    );
};

const Create = props => (
    <CreateView {...props} {...useCreateController(props)} />
);

export default Create;
