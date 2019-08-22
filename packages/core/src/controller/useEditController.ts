/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { useCallback } from 'react';
import { useUpdate, useGetOne } from '../dataProvider';
import useVerison from './useVersion';


export interface EditProps {
    resource: string;
    basePath: string;
    id: string | number;
}

export const useEditController = (props: EditProps) => {
    const { resource, basePath, id } = props;

    const version = useVerison();
    const { data: record, loading } = useGetOne(resource, id, {
        version,
    });

    const [update, { loading: isSaving }] = useUpdate(
        resource,
        id,
        {},
        record
    );

    const save = useCallback(
        (data: any, { onSuccess, onFailure, refresh }: any = {}) => update(null, { data }, { onSuccess, onFailure, refresh }),
        [resource, basePath, update]
    );

    return {
        resource,
        basePath,
        record,
        id,
        isLoading: loading,
        isSaving,
        save,
        version
    };
};

export default useEditController;
