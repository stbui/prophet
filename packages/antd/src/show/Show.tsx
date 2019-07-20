import React, { cloneElement } from 'react';
import { useShowController } from 'prophet-core';
import { Card } from 'antd';

export const ShowView = ({
    resource,
    basePath,
    children,
    id,
    title,
    isLoading,
    record,
}) => (
    <Card bordered={false} title={title} loading={isLoading}>
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
