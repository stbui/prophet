/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { createContext, useContext, useMemo } from 'react';
import defaults from 'lodash/defaults';

export interface CreateControllerResult {
    isFetching: boolean;
    isLoading: boolean;
    save: any;
    saving: boolean;
    record?: any;
    redirect: any;
    resource: string;
}

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
    resource: null,
    record: null,
    redirect: null,
    save: null,
    saving: null,
    isFetching: null,
    isLoading: null,
});

const extractCreateContextProps = ({
    record,
    isFetching,
    isLoading,
    redirect,
    resource,
    save,
    saving,
}: any) => ({
    record,
    isFetching,
    isLoading,
    redirect,
    resource,
    save,
    saving,
});

export const useCreateContext = (
    props?: CreateControllerResult
): CreateControllerResult => {
    const context = useContext(CreateContext);

    return useMemo(
        () =>
            defaults(
                {},
                props != null ? extractCreateContextProps(props) : {},
                context
            ),
        [context, props]
    );
};
