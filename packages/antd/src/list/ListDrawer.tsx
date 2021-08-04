import React, { cloneElement } from 'react';
import { useListController, ListContextProvider } from '@stbui/prophet-core';
import { Drawer } from 'antd';
import { Route, Switch, useHistory } from 'react-router-dom';
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
    const history = useHistory();

    const handleClose = () => history.push(basePath);

    return (
        <Switch>
            <Route exact path={`${basePath}/create`}>
                {({ match }) => {
                    return create ? (
                        <Drawer
                            width={create.props.width}
                            visible={!!match}
                            onClose={handleClose}
                            destroyOnClose={destroyOnClose}
                            {...drawer}
                        >
                            {cloneElement(create, {
                                onCancel: handleClose,
                                onOk: handleClose,
                                ...props,
                            })}
                        </Drawer>
                    ) : null;
                }}
            </Route>

            <Route exact path={`${basePath}/:id`}>
                {({ match }: any) => {
                    const isMatch =
                        match && match.params && match.params.id !== 'create';
                    return edit ? (
                        <Drawer
                            width={edit.props.width}
                            visible={!!match}
                            onClose={handleClose}
                            destroyOnClose={destroyOnClose}
                            {...drawer}
                        >
                            {isMatch
                                ? cloneElement(edit, {
                                      id: decodeURIComponent(match.params.id),
                                      onCancel: handleClose,
                                      onOk: handleClose,
                                      ...props,
                                  })
                                : null}
                        </Drawer>
                    ) : null;
                }}
            </Route>

            <Route exact path={`${basePath}/:id/show`}>
                {({ match }: any) => {
                    const isMatch =
                        match && match.params && match.params.id !== 'create';
                    return show ? (
                        <Drawer
                            width={show.props.width}
                            visible={!!match}
                            onClose={handleClose}
                            destroyOnClose={destroyOnClose}
                            {...drawer}
                        >
                            {isMatch
                                ? cloneElement(show, {
                                      id: decodeURIComponent(match.params.id),
                                      onCancel: handleClose,
                                      onOk: handleClose,
                                      ...props,
                                  })
                                : null}
                        </Drawer>
                    ) : null;
                }}
            </Route>
        </Switch>
    );
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
