/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { createContext } from 'react';

export type DataProvider<ResourceType extends string = string> = {
    getList: (resource: ResourceType, params: any) => Promise<any>;
    getOne: (resource: ResourceType, params: any) => Promise<any>;
    update: (resource: ResourceType, params: any) => Promise<any>;
    create: (resource: ResourceType, params: any) => Promise<any>;
    delete: (resource: ResourceType, params: any) => Promise<any>;

    [key: string]: any;
};

// @ts-ignore
export const DataProviderContext = createContext<DataProvider>(null);
