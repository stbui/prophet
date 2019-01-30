import React, { cloneElement } from 'react';
import { EditController } from 'prophet-core';
import { Card } from 'antd';

export const EditView = ({
  children,
  id,
  title,
  loading,
  basePath,
  resource,
  record,
  save
}) => (
  <Card bordered={false} title={title} loading={loading}>
    {cloneElement(children, {
      basePath,
      resource,
      save,
      record,
      id
    })}
  </Card>
);

export const Edit = props => (
  <EditController {...props}>
    {controllerProps => <EditView {...props} {...controllerProps} />}
  </EditController>
);

export default Edit;
