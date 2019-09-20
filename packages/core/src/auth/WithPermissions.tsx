import useAuthenticated from './useAuthenticated';
import { createElement, FunctionComponent } from 'react';
// import useGetPermissions from './useGetPermissions';

const WithPermissions = ({ authParams, component, ...other }) => {
    useAuthenticated(authParams);

    if (component) {
        return createElement(component, { ...other });
    }

    return;
};

export default WithPermissions as any;
