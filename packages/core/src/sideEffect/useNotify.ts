import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from '../actions'

const useNotify = () => {
    const dispatch = useDispatch();
    return useCallback((type, message, description, duration) => {
        dispatch(showNotification(type, message, description, duration))
    }, [dispatch])
}

export default useNotify