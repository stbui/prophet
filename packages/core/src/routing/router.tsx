/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React from 'react';
import { useInRouterContext, BrowserRouter } from 'react-router-dom';
import { History } from 'history';

import { BasenameContextProvider } from './BasenameContextProvider';

export interface RouterProps {
    history?: History;
    basename?: string;
    children: React.ReactNode;
}

export const Router = ({ basename = '', children }: RouterProps) => {
    const isInRouter = useInRouterContext();

    return (
        <BasenameContextProvider basename={isInRouter ? basename : ''}>
            <BrowserRouter>{children}</BrowserRouter>
        </BasenameContextProvider>
    );
};
