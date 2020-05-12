import React, { FunctionComponent } from 'react';
import DeleteWithButton from './DeleteWithButton';
import DeleteWithConfirmButton from './DeleteWithConfirmButton';

export interface DeleteButtonProps {
    basePath?: string;
    label?: string;
    confirm?: any;
}

export const DeleteButton: FunctionComponent<DeleteButtonProps> = ({
    confirm,
    ...other
}) =>
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
