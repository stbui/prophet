/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { createContext, useContext, useMemo } from 'react';
import defaults from 'lodash/defaults';

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
    resource: null,
    record: null,
    redirect: null,
    save: null,
    saving: null,
    isFetching: null,
    isLoading: null,
    mutationMode: null,
    refetch: null,
});

const extractEditContextProps = ({
    data,
    record,
    defaultTitle,
    isFetching,
    isLoading,
    mutationMode,
    redirect,
    resource,
    save,
    saving,
}: any) => ({
    record: record || data,
    defaultTitle,
    isFetching,
    isLoading,
    mutationMode,
    redirect,
    resource,
    save,
    saving,
});

/**
 *
 * @example
 *
 * const { record, save saving } = useEditContext()
 */
export const useEditContext = (props?) => {
    const context = useContext(EditContext);
    return useMemo(
        () =>
            defaults(
                {},
                props != null ? extractEditContextProps(props) : {},
                context
            ),
        [context, props]
    );
};
