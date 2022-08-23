/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, { ComponentType, isValidElement } from 'react';
import { Route } from 'react-router-dom';

import { ResourceContextProvider } from './ResourceContextProvider';

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

export const Resource = (props: ResourceProps) => {
    const { list: List, create: Create, edit: Edit, show: Show, name } = props;

    return (
        <ResourceContextProvider value={name}>
            {Create && (
                <Route
                    path="create/*"
                    element={isValidElement(Create) ? Create : <Create />}
                />
            )}
            {Show && (
                <Route
                    path=":id/show/*"
                    element={isValidElement(Show) ? Show : <Show />}
                />
            )}
            {Edit && (
                <Route
                    path=":id/*"
                    element={isValidElement(Edit) ? Edit : <Edit />}
                />
            )}

            {List && (
                <Route
                    path="/*"
                    element={isValidElement(List) ? List : <List />}
                />
            )}
        </ResourceContextProvider>
    );
};

Resource.registerResource = ({
    create,
    edit,
    icon,
    list,
    name,
    options,
    show,
}: ResourceProps) => ({
    name,
    options,
    hasList: !!list,
    hasCreate: !!create,
    hasEdit: !!edit,
    hasShow: !!show,
    icon,
});
