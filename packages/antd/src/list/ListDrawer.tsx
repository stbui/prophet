import React, { cloneElement } from 'react';
import { ListController } from 'prophet-core';
import { Spin, Drawer } from 'antd';
import { Route } from 'react-router';

export const DrawerListView = props => {
    const {
        children,
        isLoading,
        actions,
        basePath,
        create,
        edit,
        show,
    } = props;
    const handleClose = () => {
        const { history, basePath } = props;
        history.push(basePath);
    };

    return (
        <React.Fragment>
            <Spin spinning={isLoading}>
                {actions && cloneElement(actions, { ...props })}
                {children && cloneElement(children, { ...props })}
            </Spin>
            <Route path={`${basePath}/:id`}>
                {({ match }) => {
                    const isMatch =
                        match && match.params && match.params.id !== 'create';
                    return (
                        <Drawer visible={!!match} onClose={handleClose}>
                            {isMatch ? cloneElement(edit, { ...props }) : null}
                        </Drawer>
                    );
                }}
            </Route>
            <Route path={`${props.basePath}/:id/show`}>
                {({ match }) => {
                    const isMatch =
                        match && match.params && match.params.id !== 'create';
                    return (
                        <Drawer visible={!!match} onClose={handleClose}>
                            {isMatch ? cloneElement(show, { ...props }) : null}
                        </Drawer>
                    );
                }}
            </Route>
            <Route path={`${basePath}/create`}>
                {({ match }) => {
                    return (
                        <Drawer visible={!!match} onClose={handleClose}>
                            {cloneElement(create, { ...props })}
                        </Drawer>
                    );
                }}
            </Route>
        </React.Fragment>
    );
};

export const DrawerList = props => (
    <ListController {...props}>
        {controllerProps => <DrawerList {...props} {...controllerProps} />}
    </ListController>
);

export default DrawerList;
