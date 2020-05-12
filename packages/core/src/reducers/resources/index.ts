/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import {
    REGISTER_RESOURCE,
    UNREGISTER_RESOURCE,
    REFRESH_VIEW,
} from '../../actions';
import data from './data';
import list from './list';
import validity from './validity';

export default (
    previousState = {},
    { type, payload, meta, requestPayload }
) => {
    switch (type) {
        case REGISTER_RESOURCE:
            const resuorceState = {
                props: payload,
                data: data(undefined, { type, payload, meta }),
                list: list(undefined, { type, payload, meta }),
                validity: validity(undefined, {
                    type,
                    payload,
                    meta,
                    requestPayload,
                }),
            };

            return { ...previousState, [payload.name]: resuorceState };

        case UNREGISTER_RESOURCE:
            return Object.keys(previousState).reduce((acc, key) => {
                if (key === payload) {
                    return acc;
                }

                return { ...acc, [key]: previousState[key] };
            }, {});
    }

    if (type !== REFRESH_VIEW && (!meta || !meta.resource)) {
        return previousState;
    }

    const resources = Object.keys(previousState);

    const newState = resources.reduce(
        (acc, resource) => ({
            ...acc,
            [resource]:
                type === REFRESH_VIEW || meta.resource === resource
                    ? {
                          props: previousState[resource].props,
                          data: data(previousState[resource].data, {
                              type,
                              payload,
                              meta,
                          }),
                          list: list(previousState[resource].list, {
                              type,
                              payload,
                              meta,
                              requestPayload,
                          }),
                          validity: validity(previousState[resource].validity, {
                              type,
                              payload,
                              meta,
                              requestPayload,
                          }),
                      }
                    : previousState[resource],
        }),
        {}
    );

    return newState;
};

export const getResources = state =>
    Object.keys(state).map(key => state[key].props);
