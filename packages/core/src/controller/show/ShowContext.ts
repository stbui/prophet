/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { createContext, useContext } from 'react';

export const ShowContext = createContext({
    record: null,
    defaultTitle: null,
    isFetching: null,
    isLoading: null,
    refetch: null,
    resource: null,
});

export const useShowContext = () => {
    const context = useContext(ShowContext);
    return context;
};
