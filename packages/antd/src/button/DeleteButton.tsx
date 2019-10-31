import React from 'react';
import DeleteWithButton from './DeleteWithButton';
import DeleteWithConfirmButton from './DeleteWithConfirmButton';

export const DeleteButton = ({ confirm, ...other }) =>
    confirm ? (
        <DeleteWithConfirmButton {...other} />
    ) : (
        <DeleteWithButton {...other} />
    );

DeleteButton.defaultProps = {
    label: '删除',
    confirm: true,
};

export default DeleteButton;
