import React, { cloneElement } from 'react';
import { useCreateController } from '@stbui/prophet-core';
import { Card } from 'antd';

export const CreateView = props => {
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
