/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crudGetOne, crudUpdate } from '../actions';

export interface EditProps {
    resource: string;
    basePath: string;
    id: string | number;
    refresh: boolean;
}

export const useEditController = (props: EditProps) => {
    const { resource, basePath, id, refresh } = props;
    const dispatch = useDispatch();
    const record = useSelector((state: any) =>
        state.resources[resource] ? state.resources[resource].data[id] : null
    );

    const save = useCallback(
        (data: any, callback?: any, redirect?: any, refresh?: any) => {
            dispatch(
                crudUpdate(
                    resource,
                    basePath,
                    id,
                    data,
                    redirect,
                    refresh,
                    callback
                )
            );
        },
        [resource, basePath]
    );

    useEffect(() => {
        dispatch(crudGetOne(resource, basePath, id, refresh));
    }, [id]);

    return {
        resource,
        basePath,
        record,
        id,
        isLoading: false,
        save,
    };
};

export default useEditController;
