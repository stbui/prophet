/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useStoreContext } from './useStoreContext';

/**
 *
 * @example
 * import { useResetStore } from '@prophet/core';
 *
 * const ResetPrefs = () {
 *    const reset = useResetStore();
 *
 *    const handleClick = () => {
 *        reset();
 *    };
 *
 *    return <Button onClick={handleClick}>Reset preferences</Button>;
 * }
 */
export const useResetStore = () => {
    const { reset } = useStoreContext();
    return reset;
};
