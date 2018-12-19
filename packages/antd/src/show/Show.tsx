import React, { cloneElement } from 'react';
import { ShowController } from 'prophet-core';
import { Card } from 'antd';

export interface IShowProps {
  children: any;
  title: string;
  loading: boolean;
  basePath: string;
  resource: string;
  record: any;
}

export const ShowView = ({
  children,
  title,
  loading,
  basePath,
  resource,
  record
}: IShowProps) => (
  <Card bordered={false} title={title} loading={loading}>
    {cloneElement(children, {
      basePath,
      resource,
      record
    })}
  </Card>
);

export const Show = props => (
  <ShowController {...props}>
    {controllerProps => <ShowView {...props} {...controllerProps} />}
  </ShowController>
);

export default Show;
