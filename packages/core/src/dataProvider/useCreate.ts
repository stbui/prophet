/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { CREATE, CRUD_CREATE } from '../actions';
import useMuation from './useMutation';

/*
import { useCreate } from '@stbui/prophet-core';

const UserProfile = ({ record }) => {
    const [create, { loading, error }] = useCreate('users', {
        username: 'stbui',
    });

    if (error) {
        return error.message;
    }

    return (
        <div loading={loading} onClick={create}>
            create
        </div>
    );
};
*/

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
 */
const useCreate = (resource: string, data: object = {}, options?: object) =>
    useMuation(
        { type: CREATE, resource, payload: { data } },
        { ...options, action: CRUD_CREATE }
    );

export default useCreate;
