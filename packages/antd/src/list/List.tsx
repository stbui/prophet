import React, { cloneElement, Children } from 'react';
import { useListController } from '@stbui/prophet-core';
import ListActions from './ListActions';
import { Card } from 'antd';

const ListView = ({ children, loading, title, actions, ...other }) => {
    return (
        <Card bordered={false} title={title} loading={loading}>
            {actions && cloneElement(actions, { ...other })}
            {children && cloneElement(Children.only(children), { ...other })}
        </Card>
    );
};

ListView.defaultProps = {
    actions: <ListActions />,
};

const List = props => <ListView {...props} {...useListController(props)} />;

export default List;
