/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { FunctionComponent } from 'react';
import useMutation from './useMutation';

/*
import { Mutation, UPDATE } from 'prophet-core';

const UserProfile = ({ record }) => (
    <Mutation
        type={UPDATE}
        resource="users"
        payload={{ id: record.id, data: { username: 'stbui' } }}
    >
        {([update, { data, loading, error }]) => {
            if (loading) {
                return 'loading';
            }

            if (error) {
                return error.message;
            }


            return <div onClick={update}>{data.username}</div>;
        }}
    </Mutation>
);
 */

interface ChildrenFuncParams {
    data?: any;
    total?: number;
    loading?: boolean;
    loaded?: boolean;
    error?: any;
}

export interface Props {
    children: any;
    type: string;
    resource: string;
    payload?: any;
    options?: any;
}

/**
 *
 * @param {Function} children
 * @param {string} type
 * @param {string} resource
 * @param {Object} payload
 * @param {Object} options
 * @param {string} options.action
 * @param {Function} options.onSuccess
 * @param {Function} options.onFailure
 *
 * @example
 */
export const Mutation: FunctionComponent<Props> = ({
    children,
    type,
    resource,
    payload,
    options,
}) => children(useMutation({ type, resource, payload }, options));

export default Mutation;
