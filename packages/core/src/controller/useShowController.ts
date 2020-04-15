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

export interface ShowControllerProps {
    resource: string;
    basePath: string;
    record: any;
    loading: any;
    loaded: any;
}

/*
import { useShowController } from '@stbui/prophet-core';

const ShowView = () => <div>...</div>

const create = props => {
    const controllerProps = useShowController(props);

    return <ShowView { ...controllerProps } {...props } />;
}
*/

export const useShowController = (props: ShowProps): ShowControllerProps => {
    const { resource, basePath, id } = props;
    const notify = useNotify();

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
    };
};

export default useShowController;
