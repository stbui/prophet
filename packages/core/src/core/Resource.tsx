/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, { ComponentType, isValidElement, ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ResourceContextProvider } from './ResourceContextProvider';

export interface ResourceProps {
    name: string;
    list?: ComponentType;
    create?: ComponentType;
    edit?: ComponentType;
    show?: ComponentType;
    children?: ReactNode;
}

export const Resource = (props: ResourceProps) => {
    const { list: List, create: Create, edit: Edit, show: Show, name } = props;

    return (
        <ResourceContextProvider value={name}>
            <Routes>
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
                {props.children}
            </Routes>
        </ResourceContextProvider>
    );
};

Resource.prophetName = 'Resource';

Resource.registerResource = ({
    create,
    edit,
    list,
    name,
    show,
}: ResourceProps) => ({
    name,
    hasList: !!list,
    hasCreate: !!create,
    hasEdit: !!edit,
    hasShow: !!show,
});
