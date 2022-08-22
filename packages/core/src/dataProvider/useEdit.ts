/**
@license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useMutation, useQuery } from '../dataProvider';
import { GET_ONE, UPDATE } from '../actions';

export interface EditProps {
    resource: string;
    id: string | number;
    payload?: object;
}

export interface UseEditValue {
    record: any;
    id: string | number;
    loading: any;
    saving: any;
    save: any;
    error: any;
    saveError: any;
}

/**
 *
 * @param {string} resource
 * @param {string} id
 * @param {Object} payload
 *
 * @returns
 *
 * @example
 *
 * import { useEdit } from '@atbui/prophet-core';
 *
 * const UserEdit = () => {
 *   const { record, loading, save, isSaving } = useEdit({ resource, id payload: { data: { userId:1 } } });
 *   if (loading) {
 *       return 'loading';
 *   }
 *
 *   if (error) {
 *       return error.message;
 *   }
 *
 *   return <div onclick={save}>{record.username}</div>;
 * }
 */
export const useEdit = ({ resource, id, payload }: EditProps): UseEditValue => {
    const { data: record, loading, error } = useQuery({
        type: GET_ONE,
        resource,
        payload: { id, ...payload },
    });

    const [update, { loading: saving, error: saveError }] = useMutation(
        {
            type: UPDATE,
            resource,
            payload: { id, previousData: record },
        },
        {}
    );

    const save = useCallback(
        (data: any, { onSuccess, onFailure, refresh }: any = {}) =>
            update({ payload: { data } }, { onSuccess, onFailure, refresh }),
        [resource, update]
    );

    return {
        record,
        id,
        loading,
        saving,
        save,
        error,
        saveError,
    };
};

export default useEdit;
