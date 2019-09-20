import { cloneElement } from 'react';
import useAuthenticated from './useAuthenticated';

const Authenticated = ({ children, authParams, location, ...other }) => {
    useAuthenticated();

    return cloneElement(children, other);
};

export default Authenticated;
