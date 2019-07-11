import React, { cloneElement } from 'react';
import { ListController } from 'prophet-core';
import { Spin, Drawer } from 'antd';
import { Route } from 'react-router';
import ListActions from './ListActions';

export const ListView = props => {
    const {
        children,
        isLoading,
        actions = <ListActions />,
        basePath,
        create,
        edit,
        show,
        ...other
    } = props;
    const handleClose = () => {
        const { history, basePath } = props;
        history.push(basePath);
    };

    return (
        <React.Fragment>
            {actions && cloneElement(actions, { basePath, ...other })}
            <Spin spinning={isLoading}>
                {children && cloneElement(children, { basePath, ...other })}
            </Spin>
            <Route exact extace path={`${basePath}/:id`}>
                {({ match }) => {
                    const isMatch =
                        match && match.params && match.params.id !== 'create';
                    return edit ? (
                        <Drawer
                            width={edit.props.width}
                            visible={!!match}
                            onClose={handleClose}
                        >
                            {isMatch
                                ? cloneElement(edit, {
                                      id: match.params.id,
                                      onCancel: handleClose,
                                      onOk: handleClose,
                                      ...props,
                                  })
                                : null}
                        </Drawer>
                    ) : null;
                }}
            </Route>

            <Route exact path={`${props.basePath}/:id/show`}>
                {({ match }) => {
                    const isMatch =
                        match && match.params && match.params.id !== 'create';
                    return show ? (
                        <Drawer
                            width={show.props.width}
                            visible={!!match}
                            onClose={handleClose}
                        >
                            {isMatch
                                ? cloneElement(show, {
                                      id: match.params.id,
                                      onCancel: handleClose,
                                      onOk: handleClose,
                                      ...props,
                                  })
                                : null}
                        </Drawer>
                    ) : null;
                }}
            </Route>
            <Route exact path={`${basePath}/create`}>
                {({ match }) => {
                    return create ? (
                        <Drawer
                            width={create.props.width}
                            visible={!!match}
                            onClose={handleClose}
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
        </React.Fragment>
    );
};

export const ListDrawer = props => (
    <ListController {...props}>
        {controllerProps => <ListView {...props} {...controllerProps} />}
    </ListController>
);

export default ListDrawer;
