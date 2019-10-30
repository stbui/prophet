/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useSelector } from 'react-redux';

export const useVersion = () => useSelector((state: any) => state.refresh);

export default useVersion;
