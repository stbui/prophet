import React from 'react';
import { Link as RRLink } from 'react-router-dom';

export const Link = ({ to, children, className, ...other }) => (
  <RRLink to={to} className={className} {...other}>
    {children}
  </RRLink>
);

export default Link;
