import React, { cloneElement } from 'react';
import { CreateController } from 'prophet-core';
import { Card } from 'antd';

export const CreateView = ({
  children,
  title,
  loading,
  basePath,
  resource,
  record = {},
  save
}) => (
  <Card bordered={false} title={title} loading={loading}>
    {cloneElement(children, {
      basePath,
      resource,
      record,
      save
    })}
  </Card>
);

export const Create = props => (
  <CreateController {...props}>
    {controllerProps => <CreateView {...props} {...controllerProps} />}
  </CreateController>
);

export default Create;
