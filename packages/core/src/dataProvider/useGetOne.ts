/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crudGetOne } from '../actions';

export interface ShowProps {
    resource: string;
    basePath: string;
    id: string | number;
    refresh: boolean;
}

export const useGetOne = (props: ShowProps) => {
    const { resource, basePath, id, refresh } = props;
    const dispatch = useDispatch();
    const record = useSelector((state: any) =>
        state.resources[resource] ? state.resources[resource].data[id] : null
    );

    useEffect(() => {
        dispatch(crudGetOne(resource, basePath, id, refresh));
    }, [resource, basePath]);

    return {
        resource,
        basePath,
        record, 
        id,
        isLoading: false,
    };
};

export default useGetOne;
