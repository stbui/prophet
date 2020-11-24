import React, { cloneElement, FunctionComponent } from 'react';
import { useListController } from '@stbui/prophet-core';
import { Spin, Drawer } from 'antd';
import { Route, Switch, useHistory } from 'react-router-dom';
import ListActions from './ListActions';

interface Props {
    children?: any;
    loading?: boolean;
    title?: string;
    actions?: any;
    basePath?: any;
    create?: any;
    edit?: any;
    show?: any;
    destroyOnClose?: any;
    drawer?: any;
}

export const ListView: FunctionComponent<Props> = props => {
    const {
        children,
        loading,
        actions,
        basePath,
        create,
        edit,
        show,
        destroyOnClose,
        drawer,
        ...other
    } = props;
    const history = useHistory();

    const handleClose = () => history.push(basePath);

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
                            match &&
                            match.params &&
                            match.params.id !== 'create';
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

                <Route exact path={`${basePath}/:id/show`}>
                    {({ match }: any) => {
                        const isMatch =
                            match &&
                            match.params &&
                            match.params.id !== 'create';
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
            </Switch>
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
