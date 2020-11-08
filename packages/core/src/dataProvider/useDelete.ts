/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { DELETE, CRUD_DELETE } from '../actions';
import useMuation from './useMutation';

export type UseDeleteValue = [
    (query?: Partial<any>, options?: Partial<any>) => void,
    {
        data?: any;
        total?: number;
        error?: any;
        loading?: boolean;
        loaded?: boolean;
    }
];

/**
 *
 * @param {string} resource
 * @param {string} id
 * @param {Object} previousData
 * @param {Object} options
 * @param {string} options.action
 * @param {Function} options.onSuccess
 * @param {Function} options.onFailure
 *
 * @returns
 *
 * @example
 *
 * import { useDelete } from '@stbui/props-core';
 *
 * const UserProfile = ({ record }) => {
 *    const [delete, { loading, error }] = useDelete('users', record.id);
 *
 *    if (error) {
 *        return error.message;
 *    }
 *
 *    return (
 *        <div loading={loading} onClick={delete}>
 *            delete
 *        </div>
 *    );
 * };
 */
export const useDelete = (
    resource: string,
    id: string | number,
    previousData: object = {},
    options?: object
): UseDeleteValue =>
    useMuation(
        { type: DELETE, resource, payload: { id, previousData } },
        { ...options, action: CRUD_DELETE }
    );

export default useDelete;
