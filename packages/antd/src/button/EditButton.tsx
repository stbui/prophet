import React from 'react';
import { Link } from '../Link';

const EditButton = ({ basePath, label, id }) => (
    <Link to={`${basePath}/${id}`}>{label}</Link>
);

EditButton.defaultProps = {
    label: '编辑',
};

export default EditButton;
