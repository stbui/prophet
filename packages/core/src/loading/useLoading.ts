/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useSelector } from 'react-redux';

export default () => useSelector((state: any) => state.loading > 0);
