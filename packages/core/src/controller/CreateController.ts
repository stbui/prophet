/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { ReactNode, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crudCreate } from '../actions';

export interface Props {
    children(props: any): ReactNode;
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

export const isLoading = useSelector((state: any) => state.loading > 0);

const CreateController = (props: Props) => {
    const { children, resource, basePath, hasEdit, hasShow } = props;
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

    return children({
        resource,
        basePath,
        save,
        isLoading,
        redirect: getDefaultRedirectRoute(hasEdit, hasShow),
    });
};

export default CreateController;
