import React, { cloneElement } from 'react';
import { useListController } from 'prophet-core';
import { Spin, Drawer } from 'antd';
import { Route } from 'react-router';
import ListActions from './ListActions';

export const ListView = props => {
    const {
        children,
        loading,
        actions,
        basePath,
        create,
        edit,
        show,
        destroyOnClose,
        ...other
    } = props;

    const handleClose = () => {
        const { history, basePath } = props;
        history.push(basePath);
    };

    const resource = {
        hasEdit: !!edit,
        hasCreate: !!create,
        hasShow: !!show,
    };

    return (
        <React.Fragment>
            {actions &&
                cloneElement(actions, {
                    basePath,
                    ...other,
                    ...resource,
                })}
            <Spin spinning={loading}>
                {children &&
                    cloneElement(children, { basePath, ...other, ...resource })}
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
                            destroyOnClose
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
                            destroyOnClose
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
                            destroyOnClose
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

ListView.defaultProps = {
    actions: <ListActions />,
    destroyOnClose: true,
};

export const ListDrawer = props => (
    <ListView {...props} {...useListController(props)} />
);

export default ListDrawer;
