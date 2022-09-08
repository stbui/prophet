/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';

import { useNotificationContext } from './useNotificationContext';

export interface NotificationOptions {
    // 延迟
    autoHideDuration?: number;
    // translate
    messageArgs?: any;
    // 多行
    multiLine?: boolean;
    // 回撤
    undoable?: boolean;
}

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
            const { type: messageType = 'info', ...notificationOptions } =
                options;
            addNotification({
                message,
                type: messageType,
                notificationOptions,
            });
        },
        [addNotification]
    );
};
