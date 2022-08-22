/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useGetOne } from '../../dataProvider';
import { useNotify } from '../../sideEffect';
import useVersion from '../useVersion';
import { useResourceContext } from '../../core';

export interface ShowProps {
    resource: string;
    basePath: string;
    id: string | number;
}

export interface ShowControllerProps {
    resource: string;
    basePath: string;
    record: any;
    loading: boolean;
    loaded: boolean;
    version: number;
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
    const { basePath, id } = props;
    const resource = useResourceContext(props);
    const notify = useNotify();
    const version = useVersion();

    const { data: record, loading, loaded } = useGetOne(resource, id, {
        onFailure: error =>
            notify(
                typeof error === 'string'
                    ? error
                    : error.message || 'prophet.notification.http_error',
                'error'
            ),
    });

    return {
        resource,
        basePath,
        record,
        loading,
        loaded,
        version,
    };
};

export default useShowController;
