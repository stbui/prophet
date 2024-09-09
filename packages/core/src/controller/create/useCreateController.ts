/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { useCreate } from '../../dataProvider';
import { useResourceContext, useResourceDefinition } from '../../core';
import { useNotify } from '../../notification';
import { useRedirect } from '../../routing';
import { useRefresh } from '../../loading';

interface CreateController {
    resource?: string;
    save: (data: any, option: any) => void;
    saving: boolean;
    record?: object;
    redirect?: any;
    isFetching?: boolean;
    isLoading?: boolean;
}
export interface CreateControllerProps {
    resource?: string;
    disableAuthentication?: any;
    record?: any;
    redirect?: any;
    transform?: any;
    mutationOptions?: any;
    hasEdit?: any;
    hasShow?: any;
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

export const getRecordFromLocation = ({ state, search }, record: any = {}) => {
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

export const useCreateController = (
    props: CreateControllerProps
): CreateController => {
    const {
        disableAuthentication,
        record,
        redirect: redirectTo,
        transform,
        mutationOptions = {},
    } = props;

    const resource = useResourceContext(props);
    const { hasEdit, hasShow } = useResourceDefinition(props);
    const finalRedirectTo =
        redirectTo || getDefaultRedirectRoute(hasShow, hasEdit);

    const location = useLocation();
    const notify = useNotify();
    const redirect = useRedirect();

    const { onSuccess, onError, meta, ...otherMutationOptions } =
        mutationOptions;

    const recordToUse = getRecordFromLocation(location, record);

    const [create, { isPending: saving }] = useCreate(
        resource,
        undefined,
        otherMutationOptions
    );

    const save = useCallback(
        (
            data: any,
            {
                onSuccess: onSuccessFromSave,
                onError: onErrorFromSave,
                transform: transformFromSave,
            }: any = {}
        ) => {
            create(
                resource,
                { data, meta },
                {
                    onSuccess: (data, variables, context) => {
                        if (onSuccessFromSave) {
                            return onSuccessFromSave(data, variables, context);
                        }
                        if (onSuccess) {
                            return onSuccess(data, variables, context);
                        }

                        notify('prophet.notification.created', {
                            type: 'info',
                            messageArgs: { smart_count: 1 },
                        });
                        redirect(finalRedirectTo, resource, data.id, data);
                    },
                    onError: (error: Error) => {
                        if (onErrorFromSave) {
                            return onErrorFromSave(error);
                        }
                        if (onError) {
                            return onError(error);
                        }

                        notify(
                            typeof error === 'string'
                                ? error
                                : error.message ||
                                      'prophet.notification.http_error',
                            {
                                type: 'warning',
                                messageArgs: {
                                    _:
                                        typeof error === 'string'
                                            ? error
                                            : error && error.message
                                              ? error.message
                                              : undefined,
                                },
                            }
                        );
                    },
                }
            );
        },
        [
            create,
            finalRedirectTo,
            meta,
            notify,
            onError,
            onSuccess,
            redirect,
            resource,
            transform,
        ]
    );

    return {
        resource,
        save,
        saving,
        isFetching: false,
        isLoading: false,
        record: recordToUse,
        redirect: finalRedirectTo,
    };
};
