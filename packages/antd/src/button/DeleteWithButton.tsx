import React from 'react';
import { useDeleteController } from '@stbui/prophet-core';
import { message, Button } from 'antd';

export const DeleteWithButtonView = props => {
    const { label, disabled, className, style, update, record } = props;

    const onConfirm = () =>
        update(record.id, record, {
            onSuccess() {
                message.success('删除成功');
            },
            onFailure(error) {
                message.error(error.message);
            },
            refresh: true,
        });

    return (
        <Button
            type="link"
            disabled={disabled}
            className={className}
            style={style}
            onClick={onConfirm}
        >
            {label}
        </Button>
    );
};

export const DeleteWithButton = props => (
    <DeleteWithButtonView {...props} {...useDeleteController(props)} />
);

export default DeleteWithButton;
