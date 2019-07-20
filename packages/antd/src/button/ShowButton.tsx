import React from 'react';
import { Link } from '../Link';

export const ShowButton: any = ({ basePath, label, id }) => {
    return <Link to={`${basePath}/${id}/show`}>{label}</Link>;
};

ShowButton.defaultProps = {
    label: '详情',
};

export default ShowButton;
