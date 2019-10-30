/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useUpdate, useGetOne } from '../dataProvider';
import { useNotify, useRedirect } from '../sideEffect';

export interface EditProps {
    resource: string;
    basePath: string;
    id: string | number;
}

export const useEditController = (props: EditProps) => {
    const { resource, basePath, id } = props;
    const notify = useNotify();
    const redirect = useRedirect();

    const { data: record, loading } = useGetOne(resource, id, {
        onFailure: () => {
            notify('获取失败', 'error');
        },
    });

    const [update, { loading: saving }] = useUpdate(resource, id, {}, record);

    const save = useCallback(
        (
            data: any,
            { onSuccess, onFailure, refresh, redirectTo = 'list' }: any = {}
        ) =>
            update(
                { data },
                {
                    onSuccess: onSuccess
                        ? onSuccess
                        : () => {
                              notify('更新成功', 'success');
                              redirect(redirectTo, basePath, data.id);
                          },
                    onFailure: onFailure
                        ? onFailure
                        : () => {
                              notify('更新失败', 'error');
                          },
                    refresh,
                }
            ),
        [resource, basePath, update]
    );

    return {
        resource,
        basePath,
        record,
        id,
        loading,
        saving,
        save,
    };
};

export default useEditController;
