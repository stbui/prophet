/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React from 'react';
import { useEffect, ReactNode } from 'react';
import { useStoreContext } from './useStoreContext';

/**
 * @example
 *
 *     <StoreSetter name="list.density" value="small">
 *         <MyStoreDependentComponent />
 *     </StoreSetter>
 *
 * @example
 *
 * const [, setDensity] = useStore('list.density');
 *
 * useEffect(() => {
 *     setDensity('small');
 * }, []);
 *
 * @param {Props}    props
 * @param {string}   props.name
 * @param {any}      props.value
 * @param {children} props.children
 */
export const StoreSetter = ({ value, name, children }: StoreSetterProps) => {
    const { setItem } = useStoreContext();

    useEffect(() => {
        setItem(name, value);
    }, [name, setItem, value]);

    return <>{children}</>;
};

export interface StoreSetterProps {
    name: string;
    value: any;
    children: ReactNode;
}
