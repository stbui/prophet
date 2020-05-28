import React, { cloneElement, FunctionComponent } from 'react';
import { useCreateController } from '@stbui/prophet-core';
import { Card } from 'antd';

interface Props {
    children: any;
    resource?: string;
    basePath?: string;
    title?: string;
    loading?: any;
    actions?: any;
    record?: object;
    save?: any;
    card?: any;
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
        card,
        ...other
    } = props;

    return (
        <Card bordered={false} title={title} loading={loading} {...card}>
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
