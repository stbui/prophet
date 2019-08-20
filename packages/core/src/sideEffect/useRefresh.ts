import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { refreshView } from '../actions';

const useRefresh = () => {
    const dispatch = useDispatch();

    return useCallback(() => {
        dispatch(refreshView());
    }, [dispatch]);
};

export default useRefresh;
