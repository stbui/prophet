/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useState, useCallback } from 'react';

/*
const { filter, setFilter } = useFilterState({
    filterToQuery: v => ({ query: v }),
    permanentFilter: { name: 'stbui' },
    debounceTime: 500,
});
*/

let timer;

export default ({
    filterToQuery = v => ({ q: v }),
    permanentFilter,
    debounceTime = 500,
}) => {
    const [filter, setFilterValue] = useState({
        ...permanentFilter,
        ...filterToQuery(''),
    });

    const setFilter = useCallback(value => {
        if (timer) {
            clearInterval(timer);
        }

        // timer = setTimeout(() => {
        //     setFilterValue({
        //         ...permanentFilter,
        //         ...filterToQuery(value),
        //     });
        // }, debounceTime)

        setFilterValue({
            ...permanentFilter,
            ...filterToQuery(value),
        });
    }, []);

    return { filter, setFilter };
};
