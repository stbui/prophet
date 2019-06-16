import React from 'react';
import DeleteWithButton from './DeleteWithButton';

export const DeleteButton: any = ({ ...other }) => {
  return <DeleteWithButton {...other} />;
};

DeleteButton.defaultProps = {
  label: '删除',
  undoable: true
};

export default DeleteButton;
