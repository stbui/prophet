import { useState, useEffect } from 'react';

/**
 * 分页
 * const [page, perPage, setPage, setPerPage] = usePaginationState();
 */
export default (initialPerPage: number = 20) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(initialPerPage);

    useEffect(() => setPerPage(initialPerPage), [initialPerPage]);

    return {
        page,
        perPage,
        setPage,
        setPerPage,
    };
};
