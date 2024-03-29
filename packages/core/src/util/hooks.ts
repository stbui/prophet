import React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import isEqual from 'lodash/isEqual';

export function useSafeSetState<T>(
    initialState?: T | (() => T)
): [T | undefined, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState(initialState);

    const mountedRef = useRef(false);
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);
    const safeSetState = useCallback(
        args => {
            if (mountedRef.current) {
                return setState(args);
            }
        },
        [mountedRef, setState]
    );

    return [state, safeSetState];
}

export function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export function useDeepCompareEffect(callback, inputs) {
    const cleanupRef = useRef();
    useEffect(() => {
        if (!isEqual(previousInputs, inputs)) {
            cleanupRef.current = callback();
        }
        return cleanupRef.current;
    });
    const previousInputs = usePrevious(inputs);
}

export function useTimeout(ms = 0, key = '') {
    const [ready, setReady] = useSafeSetState(false);

    useEffect(() => {
        setReady(false);
        let timer = setTimeout(() => {
            setReady(true);
        }, ms);

        return () => {
            clearTimeout(timer);
        };
    }, [key, ms, setReady]);

    return ready;
}

export function useIsMounted() {
    const isMounted = useRef(true);
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);
    return isMounted;
}
