/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import useDataProvider from './useDataProvider';

export interface Query {
    type: string;
    resource: string;
    payload: object;
}

export interface QueryOptions {
    action?: string;
    onSuccess?: (response: any) => any | Object;
    onError?: (error?: any) => any | Object;
    [key: string]: any;
}

export interface UseQueryStoreValue {
    data?: any;
    total?: number;
    error?: any;
    loading?: boolean;
    loaded?: boolean;
}

const isEmptyList = data =>
    Array.isArray(data)
        ? data.length === 0
        : data &&
          Object.keys(data).length === 0 &&
          data.hasOwnProperty('fetchedAt');

const defaultDataSelector = query => (state: any) => {
    return undefined;
};

const defaultTotalSelector = () => null;

/**
 * 从redux中获取数据
 *
 * @param {Object} query
 * @param {string} query.type
 * @param {string} query.resource
 * @param {Object} query.payload
 * @param {Object} options
 * @param {string} options.action
 * @param {Function} options.onSuccess
 * @param {Function} options.onFailure
 * @param {function} dataSelector
 * @param {function} totalSelector
 *
 * @returns
 *
 * @example
 *
 * import { useQueryWithStore } from '@stbui/prophet-core';
 *
 * const UserProfile = record => {
 *   const { data, loading, error } = useQueryWithStore(
 *      {
 *          type: 'GET_ONE',
 *           resource: 'users',
 *          payload: { id: record.id },
 *       },
 *       {},
 *       state => state.resource.user.data[record.id]
 *   );
 *
 *   if (loading) {
 *       return 'loading';
 *   }
 *
 *   if (error) {
 *       return error.message;
 *  }
 *
 *   return <div>{data.username}</div>;
 * };
 */
const useQueryWithStore = (
    query: Query,
    options: QueryOptions = { action: 'CUSTOM_QUERY' },
    dataSelector: (state: any) => any = defaultDataSelector(query),
    // @ts-ignore
    totalSelector: (state: any) => number = defaultTotalSelector
): UseQueryStoreValue => {
    const { type, resource, payload } = query;
    const data = useSelector(dataSelector);
    const total = useSelector(totalSelector);

    const [state, setState]: any = useState({
        data,
        total,
        error: null,
        loading: true,
        loaded: data !== undefined && !isEmptyList(data),
    });

    if (!isEqual(state.data, data) || state.total !== total) {
        if (typeof total !== 'undefined' && isNaN(total)) {
            console.error('请求响应中total不是nubmer类型。');
        } else {
            setState({
                ...state,
                data,
                total,
                loaded: true,
            });
        }
    }

    const dataProvider = useDataProvider();
    useEffect(() => {
        setState(prevState => ({ ...prevState, loading: true }));

        dataProvider(type, resource, payload, options)
            .then(() => {
                setState(prevState => ({
                    ...prevState,
                    error: null,
                    loading: false,
                    loaded: true,
                }));
            })
            .catch(error => {
                setState({
                    error,
                    loading: false,
                    loaded: false,
                });
            });
    }, [JSON.stringify({ query, options })]);

    return state;
};

export default useQueryWithStore;
