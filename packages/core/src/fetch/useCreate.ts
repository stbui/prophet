/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { crudCreate } from '../actions';

export interface CreateProps {
    resource: string;
    basePath: string;
}

const useCreate = (props: CreateProps) => {
    const { resource, basePath } = props;
    const dispatch = useDispatch();

    const update = useCallback(
        (data: any, callback?: any, redirect?: any, refresh?: any) => {
            dispatch(
                crudCreate(
                    resource,
                    basePath,
                    data,
                    redirect,
                    refresh,
                    callback
                )
            );
        },
        [resource, basePath]
    );

    return [update, {
        resource,
        basePath,
        isLoading: false,
    }];
};

export default useCreate;
