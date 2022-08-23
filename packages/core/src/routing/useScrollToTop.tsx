/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 *
 * @example
 * import { Link } from 'react-router-dom';
 * import { Button } from 'antd';
 *
 * const AppButton = () => (
 *     <Button
 *         component={Link}
 *         to={{
 *             pathname: '/foo',
 *             state: { _scrollToTop: true },
 *         }}
 *     >
 *         test
 *     </Button>
 * );
 */
export const useScrollToTop = () => {
    const location = useLocation();
    useEffect(() => {
        if (
            (location.state as any)?._scrollToTop &&
            typeof window != 'undefined'
        ) {
            window.scrollTo(0, 0);
        }
    }, [location]);
};
