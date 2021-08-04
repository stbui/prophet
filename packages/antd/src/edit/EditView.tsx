import React, { cloneElement } from 'react';
import { Spin } from 'antd';

interface EditViewProps {
    actions?: any;
    resource?: string;
    basePath?: string;
    loading?: boolean;
    record?: object;
    [key: string]: any;
}

export const EditView = ({
    children,
    loading,
    actions,
    record,
    ...reset
}: EditViewProps) => (
    <Spin spinning={loading}>
        {actions && cloneElement(actions, { ...reset })}
        {!loading && record
            ? cloneElement(children, {
                  record,
                  ...reset,
              })
            : null}
    </Spin>
);

export default EditView;
