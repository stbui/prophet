import React, { cloneElement, FunctionComponent } from 'react';
import { useEditController } from '@stbui/prophet-core';
import { Card } from 'antd';

interface Props {
    children: any;
    resource?: string;
    basePath?: string;
    title?: string;
    loading?: any;
    actions?: any;
    record?: any;
    save?: any;
    id?: any;
    card?: any;
}

export const EditView: FunctionComponent<Props> = ({
    basePath,
    resource,
    children,
    id,
    title,
    loading,
    record,
    save,
    actions,
    card,
    ...other
}) => (
    <Card bordered={false} title={title} loading={loading} {...card}>
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
