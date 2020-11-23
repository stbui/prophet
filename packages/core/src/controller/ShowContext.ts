/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { createContext, useContext } from 'react';

export const ShowContext = createContext({
    basePath: null,
    resource: null,
    record: null,
    loaded: null,
    loading: null,
    version: null,
});

export const useShowContext = () => {
    const context = useContext(ShowContext);
    return context;
};
