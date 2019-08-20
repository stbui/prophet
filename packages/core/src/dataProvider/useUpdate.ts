/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { UPDATE, CRUD_UPDATE } from '../actions';
import useMuation from './useMutation';

const useUpdate = (
    resource: string,
    id: string | number,
    data?: any,
    previousData: any = {},
    options?: any
) =>
    useMuation(
        { type: UPDATE, resource, payload: { id, data, previousData } },
        { ...options, action: CRUD_UPDATE }
    );

export default useUpdate;
