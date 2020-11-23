/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { createContext, useContext } from 'react';

/**
 *
 * @example
 *
 * import { useCreateController, CreateContextProvider } from '@stbui/prophet-core';
 *
 * const App = props => {
 *     const controllerProps = useCreateController(props);
 *     return (
 *         <CreateContextProvider value={controllerProps}>
 *             <div></div>
 *         </CreateContextProvider>
 *     );
 * };
 */
export const CreateContext = createContext({
    basePath: null,
    resource: null,
    record: null,
    loaded: null,
    loading: null,
    redirect: null,
    save: null,
    saving: null,
    successMessage: null,
    version: null,
});

export const useCreateContext = () => {
    const context = useContext(CreateContext);
    return context;
};
