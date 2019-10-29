/**
@license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useMutation, useQuery } from '../dataProvider';
import { GET_ONE, UPDATE } from '../actions';

/**
import { useEdit } from '@atbui/prophet-core';

const UserEdit = () => {
    const { record, loading, save, isSaving } = useEdit({ resource, id payload: { data: { userId:1 } } });
    if (loading) {
        return 'loading';
    }

    if (error) {
        return error.message;
    }

    return <div onclick={save}>{record.username}</div>;
}
 */

export interface EditProps {
    resource: string;
    basePath: string;
    payload: any;
    id: string | number;
}

export const useEdit = (props: EditProps) => {
    const { resource, basePath, id, payload } = props;

    const { data: record, loading } = useQuery({
        type: GET_ONE,
        resource,
        payload: { id, ...payload },
    });

    const [update, { loading: isSaving }] = useMutation(
        {
            type: UPDATE,
            resource,
            payload: { id, previousData: record },
        },
        {}
    );

    const save = useCallback(
        (data: any, { onSuccess, onFailure, refresh }: any = {}) =>
            update({ data }, { onSuccess, onFailure, refresh }),
        [resource, basePath, update]
    );

    return {
        resource,
        basePath,
        record,
        id,
        loading,
        isSaving,
        save,
    };
};

export default useEdit;
