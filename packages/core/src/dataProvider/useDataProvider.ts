/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useContext } from 'react';

import { DataProviderContext } from './DataProviderContext';

export type UseDataProviderValue = (
    type: string,
    resource: string,
    params: any,
    options?: any
) => Promise<{ data?: any; total?: any; error?: any }>;

const defaultDataProvider = (type: string, resource: string, payload: any) =>
    Promise.resolve();

/**
 *
 *
 * @return
 *
 * @example
 *
 * import { useDataProvider } from '@stbui/prophet-core';
 *
 * const UserList = () => {
 *     const [user, setUser] = useState([]);
 *     const [loading, setLoading] = useState(true);
 *     const [error, setError] = useState();
 *     const dataProvider = useDataProvider();
 *
 *     useEffect(() => {
 *         dataProvider.getOne('user', { filter: { id: 1 } })
 *             .then(({ data }) => {
 *                 setUser(data);
 *                 setLoading(false);
 *             })
 *             .catch(error => {
 *                 setError(error);
 *                 setLoading(false);
 *             });
 *     }, []);
 *
 *     if (loading) return loading;
 *     if (error) return error.message;
 *
 *     return (
 *         <React.Fragment>
 *             { user.name }
 *             { user.id }
 *         </React.Fragment>
 */
export const useDataProvider = (): any => {
    const dataProvider = useContext(DataProviderContext) || defaultDataProvider;

    return dataProvider;
};

export default useDataProvider;
