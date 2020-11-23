import React, { cloneElement, Children, FunctionComponent } from 'react';
import { useListController } from '@stbui/prophet-core';
import { Spin } from 'antd';

interface Props {
    children?: any;
    actions?: any;
    loading?: boolean;
    label?: string;
}

const ListView: FunctionComponent<Props> = ({
    children,
    actions,
    loading,
    label,
    ...other
}) => (
    <Spin spinning={loading}>
        {label}
        {actions && cloneElement(actions, { ...other })}
        {children && cloneElement(Children.only(children), { ...other })}
    </Spin>
);

const List = props => <ListView {...props} {...useListController(props)} />;

export default List;
