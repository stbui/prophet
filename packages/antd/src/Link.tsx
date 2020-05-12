import React, { FunctionComponent } from 'react';
import { Link as RRLink } from 'react-router-dom';

interface Props {
    to?: any;
    children?: any;
    className?: any;
}

export const Link: FunctionComponent<Props> = ({
    to,
    children,
    className,
    ...other
}: any) => (
    <RRLink to={to} className={className} {...other}>
        {children}
    </RRLink>
);

export default Link;
