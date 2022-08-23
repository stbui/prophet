/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useContext } from 'react';
import { NotificationContext } from './NotificationContext';

export const useNotificationContext = () => useContext(NotificationContext);
