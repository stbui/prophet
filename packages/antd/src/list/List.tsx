import React, { cloneElement, Children } from 'react';
import { useListController, useLoading } from 'prophet-core';
import ListActions from './ListActions';
import { Card } from 'antd';

const ListView = ({ children, isLoading, title, actions, ...other }) => {
    return (
        <Card bordered={false} title={title} loading={isLoading}>
            {actions && cloneElement(actions, { ...other })}
            {children && cloneElement(Children.only(children), { ...other })}
        </Card>
    );
};

ListView.defaultProps = {
    actions: <ListActions />,
};

const List = props => {
    const loading = useLoading();

    return (
        <ListView
            {...props}
            {...useListController(props)}
            isLoading={loading}
        />
    );
};

export default List;
