import React from 'react';
import { ShowController } from 'prophet-core';
import { Card } from 'antd';

export const ShowView = ({ title, loading }) => (
  <Card bordered={false} title={title} loading={loading}>
    {this.props.children}
  </Card>
);

export const Show = props => (
  <ShowController {...props}>
    {controllerProps => <ShowView {...props} {...controllerProps} />}
  </ShowController>
);

export default Show;
