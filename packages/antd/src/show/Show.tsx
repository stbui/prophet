import React, { cloneElement } from 'react';
import { ShowController } from 'prophet-core';
import { Card } from 'antd';

export interface IShowProps {
    children: any;
    id: string | number;
    title: string;
    isLoading: boolean;
    basePath: string;
    resource: string;
    record: any;
}

export const ShowView = ({
    children,
    id,
    title,
    isLoading,
    basePath,
    resource,
    record,
}: IShowProps) => (
    <Card bordered={false} title={title} loading={isLoading}>
        {record
            ? cloneElement(children, {
                  basePath,
                  resource,
                  record,
                  id,
              })
            : null}
    </Card>
);

export const Show = props => (
    <ShowController {...props}>
        {controllerProps => <ShowView {...props} {...controllerProps} />}
    </ShowController>
);

export default Show;
