import React from 'react';
import { Link as RRLink } from 'react-router-dom';

export const Link: any = ({ to, children, className, ...other }: any) => (
    <RRLink to={to} className={className} {...other}>
        {children}
    </RRLink>
);

export default Link;
