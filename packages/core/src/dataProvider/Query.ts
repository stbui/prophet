/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { FunctionComponent } from 'react';
import useQuery from './useQuery';

interface ChildrenFuncParams {
    data?: any;
    total?: number;
    loading?: boolean;
    loaded?: boolean;
    error?: any;
}

export interface Props {
    children(props: ChildrenFuncParams): JSX.Element;
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
/* 
import { Query } from 'prophet-core';

const UserProfile = ({ record }) => (
    <Query type="GET_ONE" resource="users" payload={{ id: record.id }}>
        {({ data, loading, error }) => {
            if (loading) {
                return 'loading';
            }

            if (error) {
                return error.message;
            }


            return <div>{data.username}</div>;
        }}
    </Query>
);

const payload = {
    pagination: { page: 1, perPage: 10 },
    sort: { field: 'username', order: 'ASC' },
};
const UserList = () => (
    <Query type="GET_LIST" resource="users" payload={payload}>
        {({ data, total, loading, error }) => {
            if (loading) {
                return <Loading />;
            }
            if (error) {
                return <Error />;
            }

            return <div>total:{total},{data.map(user => user.username)}</div>;
        }}
    </Query>
);
 */
const Query: FunctionComponent<Props> = ({
    children,
    type,
    resource,
    payload,
    options,
}) => children(useQuery({ type, resource, payload }, options));

export default Query;
