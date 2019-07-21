import React, { cloneElement } from 'react';
import { useEditController } from 'prophet-core';
import { Card } from 'antd';

export const EditView = ({
    children,
    id,
    title,
    isLoading,
    basePath,
    resource,
    record,
    save,
}) => (
    <Card bordered={false} title={title} loading={isLoading}>
        {record
            ? cloneElement(children, {
                  basePath,
                  resource,
                  save,
                  record,
                  id,
              })
            : null}
    </Card>
);

export const Edit = props => (
    <EditView {...props} {...useEditController(props)} />
);

export default Edit;
