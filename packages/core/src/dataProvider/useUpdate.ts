/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { UPDATE, CRUD_UPDATE } from '../actions';
import useMuation from './useMutation';

/**
import { useUpdate } from '@stbui/prophet-core';
const UserUpdate = ({ record }) => {
    const [update, { loading, error }] = useUpdate(
        'user',
        record.id,
        { sex: new Date() },
        record
    );

    if (error) {
        return error.message;
    }

    return (
        <button disabled={loading} onClick={update}>
            update
        </button>
    );
};
 */
/**
 *
 * @param {string} resource
 * @param {string} id
 * @param {Object} data
 * @param {Object} previousData
 * @param {Object} options
 * @param {string} options.action
 * @param {Function} options.onSuccess
 * @param {Function} options.onFailure
 *
 * @returns [update, { data, error, loading, loaded }]
 *
 * @example
 *
 */
const useUpdate = (
    resource: string,
    id: string | number,
    data?: any,
    previousData: any = {},
    options?: any
) =>
    useMuation(
        { type: UPDATE, resource, payload: { id, data, previousData } },
        { ...options, action: CRUD_UPDATE }
    );

export default useUpdate;
