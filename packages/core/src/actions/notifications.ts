/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

export const showNotification = (
  type: 'info' | 'error' | 'success' | 'warning' = 'info',
  message: string,
  description?: string,
  duration?: number
) => ({
  type: SHOW_NOTIFICATION,
  payload: {
    type,
    message,
    description
  }
});

export const hideNotification = () => ({ type: HIDE_NOTIFICATION });
