import React from 'react';
import { push } from 'react-router-redux';
import { Button } from 'antd';

export const CreateButton: any = ({
  basePath,
  label,
  type,
  icon,
  ...other
}) => {
  const hadleClick = () => {
    push(`${basePath}/create`);
  };

  return (
    <Button type={type} onClick={hadleClick} {...other}>
      {label}
    </Button>
  );
};

CreateButton.defaultProps = {
  label: '添加',
  type: 'primary'
};

export default CreateButton;
