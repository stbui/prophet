import React, { cloneElement } from 'react';
import { useListController, ListContextProvider } from '@stbui/prophet-core';
import { Drawer } from 'antd';
import { Route, useNavigate } from 'react-router-dom';
import ListView from './ListView';

export interface ListDrawerViewProps {
    basePath: string;
    create?: any;
    edit?: any;
    show?: any;
    destroyOnClose?: boolean;
    drawer?: any;
}

export const ListDrawerView = (props: ListDrawerViewProps) => {
    const { basePath, create, edit, show, destroyOnClose, drawer } = props;
    const navigate = useNavigate();

    const handleClose = () => navigate(basePath);

    return null;
};

ListDrawerView.defaultProps = {
    destroyOnClose: true,
};

export interface ListDrawerProps {
    resource: string;
    basePath: string;
    perPage?: number;
    filter?: object;
}

export const ListDrawer = (props: ListDrawerProps) => {
    const controllerProps = useListController(props);
    return (
        <ListContextProvider value={controllerProps}>
            <ListView
                {...props}
                {...controllerProps}
                drawerView={ListDrawerView}
            />
        </ListContextProvider>
    );
};

export default ListDrawer;
