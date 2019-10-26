/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { CRUD_GET_LIST_SUCCESS } from '../../../actions';

const loaderOnce = (previousState = false, { type }) => {
    if (previousState == true) {
        return previousState;
    }
    if (type === CRUD_GET_LIST_SUCCESS) {
        return true;
    }

    return previousState;
};

export default loaderOnce;
