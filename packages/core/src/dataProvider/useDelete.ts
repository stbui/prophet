/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { DELETE, CRUD_DELETE } from '../actions';
import useMuation from './useMutation';

/*
import { useDelete } from '@stbui/props-core';

const UserProfile = ({ record }) => {
    const [delete, { loading, error }] = useDelete('users', record.id);

    if (error) {
        return error.message;
    }

    return (
        <div loading={loading} onClick={delete}>
            delete
        </div>
    );
};
*/

export const useDelete = (
    resource: string,
    id: string | number,
    previousData: any = {},
    options?: any
) =>
    useMuation(
        { type: DELETE, resource, payload: { id, previousData } },
        { ...options, action: CRUD_DELETE }
    );

export default useDelete;
