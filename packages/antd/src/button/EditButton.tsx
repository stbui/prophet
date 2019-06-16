import React from 'react';
import { Link } from 'react-router-dom';

export const EditButton: any = ({ basePath, label, record }) => {
  return <Link to={`${basePath}/${record.id}`}>{label}</Link>;
};

EditButton.defaultProps = {
  label: '编辑',
  record: {}
};

export default EditButton;
