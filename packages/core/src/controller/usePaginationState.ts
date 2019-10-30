/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useEffect, useCallback, useRef, useReducer } from 'react';

/**
 * 分页
 * const [page, perPage, setPage, setPerPage] = usePaginationState();
 */

const paginationReducer = (prevState, nextState) => {
    return {
        ...prevState,
        ...nextState,
    };
};

const defaultPagination = {
    page: 1,
    perPage: 10,
};

export default (initialPagination: any = {}) => {
    const [pagination, setPagination] = useReducer(paginationReducer, {
        ...defaultPagination,
        ...initialPagination,
    });
    const isFirstRender = useRef(true);

    const setPerPage = useCallback(perPage => setPagination({ perPage }), []);
    const setPage = useCallback(page => setPagination({ page }), []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setPerPage(initialPagination.perPage || 10);
    }, [initialPagination.perPage, setPerPage]);

    return {
        page: pagination.page,
        perPage: pagination.perPage,
        setPage,
        setPerPage,
        pagination,
        setPagination,
    };
};
