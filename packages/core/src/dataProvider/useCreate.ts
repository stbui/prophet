/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { CREATE, CRUD_CREATE } from '../actions';
import useMuation from './useMutation';

export type UseCreateValue = [
    (query?: Partial<any>, options?: Partial<any>) => void,
    {
        data?: any;
        total?: number;
        error?: any;
        loading: boolean;
        loaded: boolean;
    }
];

/**
 *
 * @param {string} resource
 * @param {Object} data
 * @param {Object} options
 * @param {string} options.action
 * @param {Function} options.onSuccess
 * @param {Function} options.onFailure
 *
 * @returns [create, { data, error, loading, loaded }]
 *
 * @example
 * import { useCreate } from '@stbui/prophet-core';
 *
 * const UserProfile = ({ record }) => {
 *    const [create, { loading, error }] = useCreate('users', {
 *        username: 'stbui',
 *    });
 *
 *   if (error) {
 *       return error.message;
 *   }
 *
 *   return <div loading={loading} onClick={create}>create</div>
 * };
 */

const useCreate = (
    resource: string,
    data: object = {},
    options?: object
): UseCreateValue =>
    useMuation(
        { type: CREATE, resource, payload: { data } },
        { ...options, action: CRUD_CREATE }
    );

export default useCreate;
