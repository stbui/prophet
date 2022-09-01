/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useGetOne } from '../../dataProvider';
import { useResourceContext } from '../../core';
import { useNotify } from '../../notification';
import { useRedirect } from '../../routing';
import { useRefresh } from '../../loading';
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

    const { data: record, loading, loaded } = useGetOne(resource, id);

    return {
        resource,
        basePath,
        record,
        loading,
        loaded,
    };
};
