/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { useCallback } from 'react';
import { useCreate } from '../dataProvider';
import { useNotify, useRedirect } from '../sideEffect';

export interface CreateProps {
    resource: string;
    basePath: string;
    refresh?: boolean;
    hasEdit?: boolean;
    hasShow?: boolean;
    record?: object;
}

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

const useCreateController = (props: CreateProps) => {
    const { resource, basePath, hasEdit, hasShow, record = {} } = props;
    const notify = useNotify();
    const redirect = useRedirect();
    const [create, { loading: isSaving }] = useCreate(resource);

    const save = useCallback(
        (
            data: any,
            { onSuccess, onFailure, refresh, redirectTo = 'list' }: any = {}
        ) => {
            create(
                { data },
                {
                    onSuccess: onSuccess
                        ? onSuccess
                        : () => {
                              notify('创建成功', 'success');
                              redirect(redirectTo, basePath, data.id);
                          },
                    onFailure: onFailure
                        ? onFailure
                        : () => {
                              notify('创建失败', 'error');
                          },
                    refresh,
                }
            );
        },
        [resource, basePath, create]
    );

    return {
        resource,
        basePath,
        save,
        loading: false,
        isSaving,
        redirect: getDefaultRedirectRoute(hasEdit, hasShow),
    };
};

export default useCreateController;
