/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { createContext } from 'react';

export type NotificationContextType = {
    notifications: any[];
    addNotification: (notification: any) => void;
    takeNotification: () => any | void;
    resetNotifications: () => void;
};

/**
 *
 * @example
 * import { useNotificationContext } from '@prophet/core';
 *
 * const App = () => {
 *    const { notifications } = useNotificationContext();
 *    return (
 *        <ul>
 *            {notifications.map(({ message }) => (
 *                <li key={index}>{ message }</li>
 *            ))}
 *        </ul>
 *    );
 * };
 *
 * @example
 * import { useNotificationContext } from '@prophet/core';
 *
 * const ResetNotificationsButton = () => {
 *    const { resetNotifications } = useNotificationContext();
 *    return (
 *        <button onClick={() => resetNotifications()}>Reset notifications</button>
 *    );
 * };
 */
export const NotificationContext = createContext<NotificationContextType>({
    notifications: [],
    addNotification: () => {},
    takeNotification: () => {},
    resetNotifications: () => {},
});
