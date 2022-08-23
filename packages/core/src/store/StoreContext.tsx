/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { createContext } from 'react';

import { Store } from './types';
import { memoryStore } from './memoryStore';

const defaultStore = memoryStore();

export const StoreContext = createContext<Store>(defaultStore);
