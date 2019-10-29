/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useState, useCallback } from 'react';

export default ({ filterToQuery = v => ({ q: v }), permanentFilter }) => {
    const [filter, setFilterValue] = useState({
        ...permanentFilter,
        ...filterToQuery(''),
    });

    const setFilter = useCallback(value => {
        setFilterValue({
            ...permanentFilter,
            ...filterToQuery(value),
        });
    }, []);

    return { filter, setFilter };
};
