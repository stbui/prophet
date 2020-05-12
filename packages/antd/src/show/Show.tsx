import React, { cloneElement, FunctionComponent } from 'react';
import { useShowController } from '@stbui/prophet-core';
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
    id?: any;
}

export const ShowView: FunctionComponent<Props> = ({
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
