/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useEffect, useCallback, useRef, useReducer } from 'react';
import { Pagination } from '../types';

export interface PaginationProps {
    page: number;
    perPage: number;
    pagination: Pagination;
    setPage: (page: number) => void;
    setPerPage: (perPage: number) => void;
    setPagination: (pagination: Pagination) => void;
}

const paginationReducer = (
    prevState: Pagination,
    nextState: Partial<Pagination>
): Pagination => {
    return {
        ...prevState,
        ...nextState,
    };
};

const defaultPagination = {
    page: 1,
    perPage: 10,
};

/**
 * 分页
 *
 * @param {Object} initialPagination
 * @param {number} initialPagination.page
 * @param {number} initialPagination.perPage
 * @returns {PaginationProps}
 *
 * @example
 *
 * const { page, setPage, perPage, setPerPage } = usePaginationState();
 *
 */
export default (
    initialPagination: { page?: number; perPage?: number } = {}
): PaginationProps => {
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
        pagination,
        setPage,
        setPerPage,
        setPagination,
    };
};
