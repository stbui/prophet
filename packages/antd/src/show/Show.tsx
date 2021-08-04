import React, { cloneElement, FunctionComponent } from 'react';
import { useShowController, ShowContextProvider } from '@stbui/prophet-core';
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

export const ShowView: FunctionComponent<Props> = ({
    resource,
    basePath,
    children,
    id,
    loading,
    record,
    actions,
    ...other
}) => (
    <Spin spinning={loading}>
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
    </Spin>
);

export const Show = props => {
    const controllerProps = useShowController(props);
    return (
        <ShowContextProvider value={controllerProps}>
            <ShowView {...props} {...controllerProps} />
        </ShowContextProvider>
    );
};

export default Show;
