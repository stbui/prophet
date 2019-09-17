/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { useGetOne } from '../dataProvider';

export interface ShowProps {
    resource: string;
    basePath: string;
    id: string | number;
}

export const useShowController = (props: ShowProps) => {
    const { resource, basePath, id } = props;

    const { data: record, loading } = useGetOne(resource, id);

    return {
        resource,
        basePath,
        record,
        loading,
    };
};

export default useShowController;
