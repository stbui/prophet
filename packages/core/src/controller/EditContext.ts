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
 * import { useEditController, EditContextProvider } from '@stbui/prophet-core';
 *
 * const App = props => {
 *     const controllerProps = useEditController(props);
 *     return (
 *         <EditContextProvider value={controllerProps}>
 *             <div></div>
 *         </EditContextProvider>
 *     );
 * };
 */
export const EditContext = createContext({
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

/**
 *
 * @example
 *
 * const { record, save saving } = useEditContext()
 */
export const useEditContext = () => {
    const context = useContext(EditContext);
    return context;
};
