/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { CREATE, CRUD_CREATE } from '../actions';
import useMuation from './useMutation';

/*
import { useCreate } from 'props-core';

const UserProfile = ({ record }) => {
    const [create, { loading, error }] = useCreate('users', {
        username: 'stbui',
    });

    if (error) {
        return <Error />;
    }

    return (
        <div loading={loading} onClick={create}>
            create
        </div>
    );
};
*/

const useCreate = (resource: string, data: any = {}, options?: any) =>
    useMuation(
        { type: CREATE, resource, payload: { data } },
        { ...options, action: CRUD_CREATE }
    );

export default useCreate;
