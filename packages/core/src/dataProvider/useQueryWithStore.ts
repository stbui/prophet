import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useDataProvider from './useDataProvider';

const useQueryWithStore = (
    query,
    options,
    dataSelector = () => undefined,
    totalSelector = () => null
) => {
    const { type, resource, payload } = query;
    const data = useSelector(dataSelector);
    const total = useSelector(totalSelector);
    const [state, setState]: any = useState({
        data,
        total,
        error: null,
        loading: true,
        loaded: false,
    });
    const dataProvider = useDataProvider();

    useEffect(() => {
        dataProvider(type, resource, payload, options)
            .then(() => {
                setState({
                    loading: false,
                    loaded: true,
                });
            })
            .catch(error => {
                setState({
                    error,
                    loading: false,
                    loaded: false,
                });
            });
    }, [JSON.stringify({ query, options })]);

    return state;
};

export default useQueryWithStore;
