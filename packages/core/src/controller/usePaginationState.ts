import { useState, useEffect } from 'react';

export default (initialPerPage: number = 20) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(initialPerPage);

    useEffect(() => {
        setPerPage;
    }, [initialPerPage]);

    return {
        page,
        perPage,
        setPage,
        setPerPage,
    };
};
