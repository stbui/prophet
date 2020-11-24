import React, { cloneElement, Children, FunctionComponent } from 'react';
import { useListController } from '@stbui/prophet-core';
import { Spin } from 'antd';
import ListActions from './ListActions';

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
    <React.Fragment>
        {label}
        <Spin spinning={loading}>
            {actions && cloneElement(actions, { ...other })}
            {children && cloneElement(Children.only(children), { ...other })}
        </Spin>
    </React.Fragment>
);

ListView.defaultProps = {
    actions: <ListActions />,
};

const List = props => <ListView {...props} {...useListController(props)} />;

export default List;
