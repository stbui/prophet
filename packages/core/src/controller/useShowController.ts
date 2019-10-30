/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useGetOne } from '../dataProvider';
import { useNotify } from '../sideEffect';

export interface ShowProps {
    resource: string;
    basePath: string;
    id: string | number;
}

export const useShowController = (props: ShowProps) => {
    const { resource, basePath, id } = props;
    const notify = useNotify();

    const { data: record, loading } = useGetOne(resource, id, {
        onFailure: () => {
            notify('获取失败', 'error');
        },
    });

    return {
        resource,
        basePath,
        record,
        loading,
    };
};

export default useShowController;
