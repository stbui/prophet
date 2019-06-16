import React from 'react';
import { Link } from 'react-router-dom';

export const ShowButton: any = ({ basePath, label, record }) => {
  return <Link to={`${basePath}/${record.id}/show`}>{label}</Link>;
};

ShowButton.defaultProps = {
  label: '详情',
  record: {}
};

export default ShowButton;
