/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

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

interface ChildrenFunParms {
    data?: any;
    total?: number;
    loading?: boolean;
    loaded?: boolean;
    error?: any;
}

export interface Props {
    children(props: ChildrenFunParms): JSX.Element;
    type: string;
    resource: string;
    payload?: any;
    options?: any;
}

export const Mutation = ({ children, type, resource, payload, options }) =>
    children(useMutation({ type, resource, payload }, options));

export default Mutation;
