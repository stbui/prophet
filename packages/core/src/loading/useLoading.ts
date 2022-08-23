/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useRef, useState, useEffect } from 'react';
import { notifyManager, useQueryClient } from 'react-query';

export const useLoading = (): boolean => {
    const client = useQueryClient();
    const mountedRef = useRef(false);

    const isFetchingRef = useRef(client.isFetching() > 0);
    const isMutatingRef = useRef(client.isMutating() > 0);

    const [isLoading, setIsLoading] = useState<boolean>(
        isFetchingRef.current || isMutatingRef.current
    );

    useEffect(() => {
        mountedRef.current = true;

        const unsubscribeQueryCache = client.getQueryCache().subscribe(
            notifyManager.batchCalls(() => {
                if (mountedRef.current) {
                    isFetchingRef.current = client.isFetching() > 0;
                    setIsLoading(
                        isFetchingRef.current || isMutatingRef.current
                    );
                }
            })
        );

        const unsubscribeMutationCache = client.getMutationCache().subscribe(
            notifyManager.batchCalls(() => {
                if (mountedRef.current) {
                    isMutatingRef.current = client.isMutating() > 0;
                    setIsLoading(
                        isFetchingRef.current || isMutatingRef.current
                    );
                }
            })
        );

        return () => {
            mountedRef.current = false;
            unsubscribeQueryCache();
            unsubscribeMutationCache();
        };
    }, [client]);

    return isLoading;
};
