import React, { cloneElement } from 'react';
import { useShowController } from '@stbui/prophet-core';
import { Card } from 'antd';

export const ShowView = ({
    resource,
    basePath,
    children,
    id,
    title,
    loading,
    record,
    actions,
    ...other
}) => (
    <Card bordered={false} title={title} loading={loading}>
        {actions && cloneElement(actions, { ...other })}
        {record
            ? cloneElement(children, {
                  resource,
                  basePath,
                  record,
                  id,
                  ...other,
              })
            : null}
    </Card>
);

const Show = props => <ShowView {...props} {...useShowController(props)} />;

export default Show;
