/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';

import { useNotificationContext } from './useNotificationContext';

/**
 *
 * @example
 *
 * const notify = useNotify();
 * notify('hello');
 * notify('hello', { type: 'warning' })
 * notify('选择 %{count} 条', { type: 'info', messageArgs: { smart_count: 23 } })
 * notify('hello', { type: 'info', undoable: true })
 */
export const useNotify = () => {
    const { addNotification } = useNotificationContext();
    return useCallback(
        (
            message: string,
            options: NotificationOptions & { type?: any } = {}
        ) => {
            const {
                type: messageType = 'info',
                ...notificationOptions
            } = options;
            addNotification({
                message,
                type: messageType,
                notificationOptions,
            });
        },
        [addNotification]
    );
};
