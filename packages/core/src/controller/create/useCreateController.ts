/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { useCreate } from '../../dataProvider';
import { useResourceContext } from '../../core';
import { useNotify } from '../../notification';
import { useRedirect } from '../../routing';
import { useRefresh } from '../../loading';
export interface CreateControllerProps {
    resource?: string;
    loading: boolean;
    loaded: boolean;
    save: (data: any, option: any) => void;
    saving: boolean;
    record?: object;
}
export interface CreateProps {
    resource?: string;
    hasCreate?: boolean;
    hasEdit?: boolean;
    hasShow?: boolean;
    record?: object;
    mutationOptions?: any;
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

export const useCreateController = (
    props: CreateProps
): CreateControllerProps => {
    const { record = {}, mutationOptions = {} } = props;
    const resource = useResourceContext(props);
    const location = useLocation();
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const { onSuccess, onError, meta, ...otherMutationOptions } =
        mutationOptions;

    const recordToUse = getRecord(location, record);

    const [create, { isLoading: saving }] = useCreate(
        resource,
        undefined,
        otherMutationOptions
    );

    const save = useCallback(
        (data: any, { onSuccess, onError }: any = {}) => {
            create({ data });
        },
        [resource, create, notify, redirect]
    );

    return {
        resource,
        loading: false,
        loaded: true,
        save,
        saving,
        record: recordToUse,
    };
};
