import React, { createElement, cloneElement } from 'react';
import { ListController } from 'prophet-core';
import ListActions from './ListActions';
import { Card } from 'antd';

export interface IProps {
    children?: any;
    actions?: any;
}

export const ListView = ({
    children,
    isLoading,
    title,
    actions = ListActions,
    ...other
}) => {
    return (
        <Card bordered={false} title={title} loading={isLoading}>
            {actions && createElement(actions, { ...other })}
            {children && cloneElement(children, { ...other })}
        </Card>
    );
};

export const List: any = (props: any) => (
    <ListController {...props}>
        {controllerProps => <ListView {...props} {...controllerProps} />}
    </ListController>
);

export default List;
