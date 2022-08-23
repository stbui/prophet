/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React from 'react';
import { useState, useCallback, useMemo } from 'react';

import { NotificationContext } from './NotificationContext';

export const NotificationContextProvider = ({ children }) => {
    const [notifications, setNotifications] = useState<any[]>([]);

    const addNotification = useCallback((notification: any) => {
        setNotifications(notifications => [...notifications, notification]);
    }, []);

    const takeNotification = useCallback(() => {
        const [notification, ...rest] = notifications;
        setNotifications(rest);
        return notification;
    }, [notifications]);

    const resetNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    const contextValue = useMemo(
        () => ({
            notifications,
            addNotification,
            takeNotification,
            resetNotifications,
        }),
        [notifications]
    );

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
        </NotificationContext.Provider>
    );
};
