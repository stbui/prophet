/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React, { FC, ComponentType } from 'react';
import { CoreContext } from './CoreContext';
import { CoreUI } from './CoreUI';
import { AuthProvider, I18nProvider } from '../types';

export interface CoreAdminProps {
    dashboard?: ComponentType;
    menu?: ComponentType;
    brand?: ComponentType;
    login?: ComponentType;
    layout: ComponentType;
    catchAll?: any;
    initialState?: object;
    authProvider?: AuthProvider;
    dataProvider: any;
    i18nProvider?: I18nProvider;
    history?: any;
    title?: string;
    children?: any;
}

export const CoreAdmin = ({
    children,
    title,
    dashboard,
    menu,
    brand,
    login,
    layout,
    catchAll,
    authProvider,
    dataProvider,
    i18nProvider,
}) => {
    return 2;
};
