import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
import { hideNotification } from '@stbui/prophet-core';

export default () => {
    const dispatch = useDispatch();
    const notification = useSelector((state: any) => state.notifications[0]);

    useEffect(() => {
        if (notification) {
            message[notification.type](
                notification.message,
                notification.duration
            );
            dispatch(hideNotification());
        }
    }, [dispatch, notification]);

    return null;
};
