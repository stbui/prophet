/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';

export type NotificationType = 'info' | 'error' | 'success' | 'warning';

export interface NotificationPayload {
    readonly message: string;
    readonly type: NotificationType;
    readonly notificationOptions?: NotificationOptions;
}
export interface ShowNotificationAction {
    readonly type: typeof SHOW_NOTIFICATION;
    readonly payload: NotificationPayload;
}

export const showNotification = (
    message: string,
    type: NotificationType = 'info',
    options?: any
): ShowNotificationAction => ({
    type: SHOW_NOTIFICATION,
    payload: {
        type,
        message,
        ...options,
    },
});

export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

export interface HideNotificationAction {
    readonly type: typeof HIDE_NOTIFICATION;
}

export const hideNotification = (): HideNotificationAction => ({
    type: HIDE_NOTIFICATION,
});
