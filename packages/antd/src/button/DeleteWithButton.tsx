import React from 'react';
import { useDeleteController } from 'prophet-core';
import { Link } from '../Link';

export const DeleteWithButtonView = props => {
    const { label, disabled, className, style, update, record } = props;

    const onConfirm = () => update(record);

    return (
        <Link
            to=""
            type="link"
            disabled={disabled}
            className={className}
            style={style}
            onClick={onConfirm}
        >
            {label}
        </Link>
    );
};

export const DeleteWithButton = props => (
    <DeleteWithButtonView {...props} {...useDeleteController(props)} />
);

export default DeleteWithButton;
