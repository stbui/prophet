import React, { FunctionComponent } from 'react';
import { Link as RRLink } from 'react-router-dom';

interface Props {
    to: string;
    children?: any;
}

export const Link: FunctionComponent<Props> = ({
    to,
    children,
    className,
    ...other
}: any) => (
    <RRLink to={to} {...other}>
        {children}
    </RRLink>
);

export default Link;
