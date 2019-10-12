/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { WithPermissions } from './auth';
import { registerResource, unregisterResource } from './actions';

const ResourceRegister: any = ({
    label,
    name,
    list,
    create,
    edit,
    show,
    icon,
    options = {},
}) => {
    const dispatch = useDispatch();

    const resource = {
        name,
        label,
        options,
        icon,
        hasList: !!list,
        hasEdit: !!edit,
        hasCreate: !!create,
        hasShow: !!show,
    };

    useEffect(() => {
        dispatch(registerResource(resource));

        return () => {
            dispatch(unregisterResource(name));
        };
    }, [dispatch, label, name, list, create, edit, show]);

    return null;
};

const ResourceRoutes: any = ({
    label,
    name,
    match,
    list,
    create,
    edit,
    show,
    options = {},
}) => {
    const isRegistered = useSelector((state: any) => {
        return state.resources[name] ? true : false;
    });

    const basePath = match ? match.url : '';

    return useMemo(() => {
        if (!isRegistered) {
            return null;
        }

        const resource = {
            resource: name,
            options,
            label,
            hasList: !!list,
            hasEdit: !!edit,
            hasCreate: !!create,
            hasShow: !!show,
        };

        return (
            <Switch>
                {create && (
                    <Route
                        path={`${basePath}/create`}
                        render={props => (
                            <WithPermissions
                                component={create}
                                basePath={basePath}
                                {...props}
                                {...resource}
                            ></WithPermissions>
                        )}
                    />
                )}
                {show && (
                    <Route
                        path={`${basePath}/:id/show`}
                        render={props => (
                            <WithPermissions
                                component={show}
                                basePath={basePath}
                                id={decodeURIComponent(props.match.params.id)}
                                {...props}
                                {...resource}
                            ></WithPermissions>
                        )}
                    />
                )}
                {edit && (
                    <Route
                        path={`${basePath}/:id`}
                        render={props => (
                            <WithPermissions
                                component={edit}
                                basePath={basePath}
                                id={decodeURIComponent(props.match.params.id)}
                                {...props}
                                {...resource}
                            ></WithPermissions>
                        )}
                    />
                )}

                {list && (
                    <Route
                        path={basePath}
                        render={props => (
                            <WithPermissions
                                component={list}
                                basePath={basePath}
                                {...props}
                                {...resource}
                            ></WithPermissions>
                        )}
                    />
                )}
            </Switch>
        );
    }, [
        basePath,
        label,
        name,
        create,
        edit,
        list,
        show,
        options,
        isRegistered,
    ]);
};

export default ({ context, ...other }) => {
    return context === 'registration' ? (
        <ResourceRegister {...other} />
    ) : (
        <ResourceRoutes {...other} />
    );
};
