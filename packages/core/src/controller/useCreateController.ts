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
import { useResourceContext } from '../core';

export interface CreateControllerProps {
    resource: string;
    basePath?: string;
    loading: boolean;
    loaded: boolean;
    save: (data: any, option: any) => void;
    saving: boolean;
    record?: object;
    redirect: any;
    version: number;
}
export interface CreateProps {
    resource?: string;
    basePath?: string;
    hasCreate?: boolean;
    hasEdit?: boolean;
    hasShow?: boolean;
    record?: object;
    successMessage?: string;
}

/**
 * import { useCreateController } from '@stbui/prophet-core';
 *
 * const CreateView = () => <div>...</div>
 *
 * const pageComponent = props => {
 *    const controllerProps = useCreateController(props);
 *
 *    return <CreateView { ...controllerProps } {...props } />;
 * }
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

export const getRecord = ({ state, search }, record: any = {}) => {
    if (state && state.record) {
        return state.record;
    }

    if (search) {
        try {
            const searchParams = parse(search);
            if (searchParams.source) {
                if (Array.isArray(searchParams.source)) {
                    return;
                }
                return JSON.parse(searchParams.source);
            }
        } catch (err) {
            console.error(`解析错误${search}，例如：?source={"title":"stbui"}`);
        }
    }

    return record;
};

const useCreateController = (props: CreateProps): CreateControllerProps => {
    const { basePath, hasEdit, hasShow, record = {}, successMessage } = props;
    const resource = useResourceContext(props);
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
