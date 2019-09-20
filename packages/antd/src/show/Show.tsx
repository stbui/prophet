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
}) => (
    <Card bordered={false} title={title} loading={loading}>
        {record
            ? cloneElement(children, {
                  resource,
                  basePath,
                  record,
                  id,
              })
            : null}
    </Card>
);

const Show = props => <ShowView {...props} {...useShowController(props)} />;

export default Show;
