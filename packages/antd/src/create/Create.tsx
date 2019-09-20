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
    } = props;

    return (
        <Card bordered={false} title={title} loading={loading}>
            {cloneElement(children, {
                resource,
                basePath,
                record,
                save,
            })}
        </Card>
    );
};

const Create = props => (
    <CreateView {...props} {...useCreateController(props)} />
);

export default Create;
