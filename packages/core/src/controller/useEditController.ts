/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { useCallback } from 'react';
import { useUpdate, useGetOne } from '../dataProvider';

export interface EditProps {
    resource: string;
    basePath: string;
    id: string | number;
}

export const useEditController = (props: EditProps) => {
    const { resource, basePath, id } = props;

    const { data: record, loading } = useGetOne(resource, id);

    const [update, { loading: isSaving }] = useUpdate(resource, id, {}, record);

    const save = useCallback(
        (data: any, { onSuccess, onFailure, refresh }: any = {}) =>
            update(null, { data }, { onSuccess, onFailure, refresh }),
        [resource, basePath, update]
    );

    return {
        resource,
        basePath,
        record,
        id,
        loading,
        isSaving,
        save,
    };
};

export default useEditController;
