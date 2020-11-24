import React, { cloneElement, FunctionComponent } from 'react';
import { useEditController } from '@stbui/prophet-core';
import { Spin } from 'antd';

interface Props {
    children: any;
    actions?: any;
    resource?: string;
    basePath?: string;
    title?: string;
    loading?: boolean;
    record?: object;
    save?: any;
    id?: string | number;
    [key: string]: any;
}

export const EditView: FunctionComponent<Props> = ({
    basePath,
    resource,
    children,
    id,
    loading,
    record,
    save,
    actions,
    ...other
}) => (
    <Spin spinning={loading}>
        {actions && cloneElement(actions, { ...other })}
        {!loading && record
            ? cloneElement(children, {
                  basePath,
                  resource,
                  save,
                  record,
                  id,
                  ...other,
              })
            : null}
    </Spin>
);

export const Edit = props => (
    <EditView {...props} {...useEditController(props)} />
);

export default Edit;
