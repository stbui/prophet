/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, {
    useEffect,
    useMemo,
    FunctionComponent,
    ComponentType,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import { WithPermissions } from '../auth';
import { registerResource, unregisterResource } from '../actions';

export interface ResourceProps {
    name: string;
    label?: string;
    match?: any;
    list?: ComponentType;
    create?: ComponentType;
    edit?: ComponentType;
    show?: ComponentType;
    options?: any;
    icon?: any;
    intent?: 'route' | 'registration';
}

const ResourceRegister: FunctionComponent<ResourceProps> = ({
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

    useEffect(() => {
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

        dispatch(registerResource(resource));

        return () => {
            dispatch(unregisterResource(name));
        };
    }, [dispatch, label, name, list, create, edit, show]);

    return null;
};

const ResourceRoutes: FunctionComponent<ResourceProps> = ({
    label,
    name,
    list,
    create,
    edit,
    show,
    options = {},
}) => {
    const match = useRouteMatch();

    const isRegistered = useSelector((state: any) => !!state.resources[name]);

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
                        render={routeProps => (
                            <WithPermissions
                                component={create}
                                basePath={basePath}
                                {...routeProps}
                                {...resource}
                            />
                        )}
                    />
                )}
                {show && (
                    <Route
                        path={`${basePath}/:id/show`}
                        render={routeProps => (
                            <WithPermissions
                                component={show}
                                basePath={basePath}
                                id={decodeURIComponent(
                                    routeProps.match.params.id
                                )}
                                {...routeProps}
                                {...resource}
                            />
                        )}
                    />
                )}
                {edit && (
                    <Route
                        path={`${basePath}/:id`}
                        render={routeProps => (
                            <WithPermissions
                                component={edit}
                                basePath={basePath}
                                id={decodeURIComponent(
                                    routeProps.match.params.id
                                )}
                                {...routeProps}
                                {...resource}
                            />
                        )}
                    />
                )}

                {list && (
                    <Route
                        path={basePath}
                        render={routeProps => (
                            <WithPermissions
                                component={list}
                                basePath={basePath}
                                {...routeProps}
                                {...resource}
                            />
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

const Resource: FunctionComponent<ResourceProps> = ({
    intent = 'route',
    ...props
}) => {
    return intent === 'registration' ? (
        <ResourceRegister {...props} />
    ) : (
        <ResourceRoutes {...props} />
    );
};

export default Resource;
