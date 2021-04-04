/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useEffect, useState } from 'react';
import useAuthProvider from './useAuthProvider';
import { UserIdentity } from '../types';

interface State {
    loading: boolean;
    loaded: boolean;
    identity?: UserIdentity;
    error?: any;
}

const defaultIdentity: UserIdentity = { id: '', fullName: undefined };

/**
 *
 * @example
 *
 * import { useGetIdentity, useGetOne } from '@stbui/prophet-core';
 *
 * const PostDetail = ({ id }) => {
 *     const { data: post, loading: postLoading } = useGetOne('posts', id);
 *     const { identity, loading: identityLoading } = useGetIdentity();
 *
 *     if (postLoading || identityLoading) return <>Loading...</>;
 *
 *     if (!post.lockedBy || post.lockedBy === identity.id) {
 *         return <PostEdit post={post} />
 *     } else {
 *         return <PostShow post={post} />
 *     }
 * }
 */
const useGetIdentity = () => {
    const [state, setState] = useState<State>({
        loading: true,
        loaded: false,
    });

    const authProvider = useAuthProvider();

    useEffect(() => {
        if (authProvider && typeof authProvider.getIdentity === 'function') {
            const callAuthProvider = async () => {
                try {
                    // @ts-ignore
                    const identity = await authProvider.getIdentity();
                    setState({
                        loading: false,
                        loaded: true,
                        identity: identity || defaultIdentity,
                    });
                } catch (error) {
                    setState({
                        loading: false,
                        loaded: true,
                        error,
                    });
                }
            };

            callAuthProvider();
        } else {
            setState({
                loading: false,
                loaded: true,
                identity: defaultIdentity,
            });
        }
    }, [authProvider, setState]);

    return state;
};

export default useGetIdentity;
