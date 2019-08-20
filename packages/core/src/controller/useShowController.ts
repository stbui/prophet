/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { useGetOne } from '../dataProvider';
import useVerison from './useVersion';
import { useRefresh } from '../sideEffect';

export interface ShowProps {
    resource: string;
    basePath: string;
    id: string | number;
    refresh: boolean;
}

export const useShowController = (props: ShowProps) => {
    const { resource, basePath, id } = props;
    const version = useVerison();
    const refresh = useRefresh();

    const { data: record, loading } = useGetOne(resource, id, {
        version,
    });

    return {
        resource,
        basePath,
        record,
        isLoading: loading,
    };
};

export default useShowController;
