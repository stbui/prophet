import React, { cloneElement } from 'react';
import { useEditController } from '@stbui/prophet-core';
import { Card } from 'antd';

export const EditView = ({
    basePath,
    resource,
    children,
    id,
    title,
    loading,
    record,
    save,
    actions,
    ...other
}) => (
    <Card bordered={false} title={title} loading={loading}>
        {actions && cloneElement(actions, { ...other })}
        {record
            ? cloneElement(children, {
                  basePath,
                  resource,
                  save,
                  record,
                  id,
                  ...other,
              })
            : null}
    </Card>
);

export const Edit = props => (
    <EditView {...props} {...useEditController(props)} />
);

export default Edit;
