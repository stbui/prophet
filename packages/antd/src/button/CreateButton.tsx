import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export const CreateButton: any = ({
  basePath,
  label,
  type,
  icon,
  ...other
}) => {
  return (
    <Button type={type} icon={icon} {...other}>
      <Link to={`${basePath}/create`} style={{ color: '#fff' }}>
        {label}
      </Link>
    </Button>
  );
};

CreateButton.defaultProps = {
  label: '新增',
  type: 'primary',
  icon: 'plus'
};

export default CreateButton;
