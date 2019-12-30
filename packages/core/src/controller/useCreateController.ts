/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { parse } from 'query-string';
import { useCreate } from '../dataProvider';
import { useNotify, useRedirect } from '../sideEffect';
import useVersion from './useVersion';

export interface CreateControllerProps {
    resource: string;
    basePath: string;
    loading: boolean;
    loaded: boolean;
    save: (data, obj) => void;
    saving: boolean;
    record?: object;
    redirect: any;
    version: number;
}
export interface CreateProps {
    resource: string;
    basePath: string;
    hasCreate?: boolean;
    hasEdit?: boolean;
    hasShow?: boolean;
    location?: any;
    record?: object;
    successMessage?: string;
}

/*
import { useCreateController } from '@stbui/prophet-core';
import CreateView from './CreateView';

const create = props => {
    const controllerProps = useCreateController(props);

    return <CreateView { ...controllerProps } {...props } />;
}
*/

export const getDefaultRedirectRoute = (
    hasEdit?: boolean,
    hasShow?: boolean
) => {
    if (hasEdit) {
        return 'edit';
    }

    if (hasShow) {
        return 'show';
    }

    return 'list';
};

export const getRecord = ({ state, search }, record: any = {}) =>
    state && state.record
        ? state.record
        : search
        ? JSON.parse(parse(search).source)
        : record;

const useCreateController = (props: CreateProps): CreateControllerProps => {
    const {
        resource,
        basePath,
        hasEdit,
        hasShow,
        location,
        record = {},
        successMessage,
    } = props;

    const notify = useNotify();
    const redirect = useRedirect();
    const version = useVersion();
    const recordToUse = getRecord(location, record);

    const [create, { loading: saving }] = useCreate(resource);

    const save = useCallback(
        (
            data: any,
            { onSuccess, onFailure, refresh, redirectTo = 'list' } = {}
        ) => {
            create(
                { data },
                {
                    onSuccess: onSuccess
                        ? onSuccess
                        : () => {
                              notify(successMessage || '创建成功', 'success');
                              redirect(redirectTo, basePath, data.id);
                          },
                    onFailure: onFailure
                        ? onFailure
                        : error =>
                              notify(
                                  typeof error === 'string'
                                      ? error
                                      : error.message ||
                                            'prophet.notification.http_error',
                                  'error'
                              ),
                    refresh,
                }
            );
        },
        [resource, basePath, create, notify, redirect, successMessage]
    );

    return {
        resource,
        basePath,
        loading: false,
        loaded: true,
        save,
        saving,
        version,
        record: recordToUse,
        redirect: getDefaultRedirectRoute(hasEdit, hasShow),
    };
};

export default useCreateController;
