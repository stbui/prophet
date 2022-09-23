import React, { cloneElement } from 'react';
import { Spin } from 'antd';

interface EditViewProps {
    actions?: any;
    resource?: string;
    basePath?: string;
    isLoading?: boolean;
    record?: object;
    [key: string]: any;
}

export const EditView = ({
    children,
    isLoading,
    actions,
    record,
    ...reset
}: EditViewProps) => (
    <Spin spinning={isLoading}>
        {actions && cloneElement(actions, { ...reset })}
        {!isLoading && record
            ? cloneElement(children, {
                  record,
                  ...reset,
              })
            : null}
    </Spin>
);

export default EditView;
