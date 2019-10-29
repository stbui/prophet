/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import ProphetCore from './Core';
import Resource from './Resource';
import Reducers from './reducers';
import Store from './Store';

export { ProphetCore, Store, Resource, Reducers };
export { getResources } from './reducers';

export * from './actions';
export * from './sideEffect';
export * from './controller';
export * from './dataProvider';
export * from './auth';
export * from './i18n';
export * from './loading';
