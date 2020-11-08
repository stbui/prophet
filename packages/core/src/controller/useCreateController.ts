/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { useCreate } from '../dataProvider';
import { useNotify, useRedirect, useRefresh } from '../sideEffect';
import useVersion from './useVersion';

export interface CreateControllerProps {
    resource: string;
    basePath: string;
    loading: boolean;
    loaded: boolean;
    save: (data: any, option: any) => void;
    saving: any;
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
    record?: object;
    successMessage?: string;
}

/*
import { useCreateController } from '@stbui/prophet-core';

const CreateView = () => <div>...</div>

const pageComponent = props => {
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

// todo: 如果路由参数存在fitelr={}，可以会报错
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
        record = {},
        successMessage,
    } = props;

    const location = useLocation();
    const notify = useNotify();
    const redirect = useRedirect();
    const version = useVersion();
    const refresh = useRefresh();

    const recordToUse = getRecord(location, record);

    const [create, { loading: saving }] = useCreate(resource);

    const save = useCallback(
        (data: any, { onSuccess, onFailure, redirectTo = 'list' } = {}) => {
            create(
                { data },
                {
                    onSuccess: onSuccess
                        ? onSuccess
                        : () => {
                              notify(successMessage || '创建成功', 'success');
                              redirect(redirectTo, basePath, data.id);
                              refresh();
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
