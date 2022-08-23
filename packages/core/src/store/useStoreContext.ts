/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useContext } from 'react';

import { StoreContext } from './StoreContext';

export const useStoreContext = () => useContext(StoreContext);
