/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useParams } from 'react-router-dom';
import { useGetOne } from '../../dataProvider';
import { useResourceContext } from '../../core';
import { useNotify } from '../../notification';
import { useRedirect } from '../../routing';
import { useRefresh } from '../../loading';
export interface ShowProps {
    resource?: string;
    queryOptions?: any;
    id: string | number;
}

export interface ShowControllerProps {
    resource: string;
    record: any;
    error: any;
    isLoading: any;
    isFetching: any;
    refetch: any;
}

/**
 *
 * @example
 *
 * import { useShowController } from '@stbui/prophet-core';
 *
 * const ShowView = () => <div>...</div>
 *
 * const App = props => {
 *     const controllerProps = useShowController(props);
 *
 *     return <ShowView { ...controllerProps } {...props } />;
 * }
 */
export const useShowController = (props: ShowProps): ShowControllerProps => {
    const { id: propsId, queryOptions = {} } = props;
    const resource = useResourceContext(props);
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const { id: routeId } = useParams<'id'>();
    // @ts-ignore
    const id = propsId != null ? propsId : decodeURIComponent(routeId);
    const { meta, ...otherQueryOptions } = queryOptions;

    const {
        data: record,
        error,
        isLoading,
        isFetching,
        refetch,
    } = useGetOne(
        resource,
        { id, meta },
        {
            onError: () => {
                notify('ra.notification.item_doesnt_exist', {
                    type: 'warning',
                });
                redirect('list', resource);
                refresh();
            },
            retry: false,
            ...otherQueryOptions,
        }
    );

    return {
        error,
        isLoading,
        isFetching,
        record,
        refetch,
        resource,
    };
};
