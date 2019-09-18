/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { useCallback } from 'react';
import { useCreate } from '../dataProvider';

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

    const [create, { loading: isSaving }] = useCreate(resource);

    const save = useCallback(
        (data: any, { onSuccess, onFailure, refresh }: any = {}) => {
            create(null, { data }, { onSuccess, onFailure, refresh });
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
