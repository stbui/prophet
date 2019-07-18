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
    refresh?: boolean;
    hasEdit?: boolean;
    hasShow?: boolean;
}

export const getDefaultRedirectRoute = (hasEdit: boolean, hasShow: boolean) => {
    if (hasEdit) {
        return 'edit';
    }

    if (hasShow) {
        return 'show';
    }

    return 'list';
};

const useCreateController = (props: CreateProps) => {
    const { resource, basePath, hasEdit, hasShow } = props;
    const dispatch = useDispatch();

    const save = useCallback(
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

    return {
        resource,
        basePath,
        save,
        isLoading: false,
        redirect: getDefaultRedirectRoute(hasEdit, hasShow),
    };
};

export default useCreateController;
