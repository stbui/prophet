import React from 'react';
import { useDeleteController, useTranslate } from '@stbui/prophet-core';
import { Popconfirm, message, Button } from 'antd';

export const DeleteWithConfirmButton = props => {
    const { label, disabled, className, style, update, record } = props;
    const translate = useTranslate();

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
        <Popconfirm
            title={translate('prophet.message.delete_content')}
            okText="确定"
            cancelText={translate('prophet.action.cancel')}
            onConfirm={onConfirm}
        >
            <Button
                type="link"
                disabled={disabled}
                className={className}
                style={style}
            >
                {label}
            </Button>
        </Popconfirm>
    );
};

const DeleteWithButton = props => (
    <DeleteWithConfirmButton {...props} {...useDeleteController(props)} />
);

export default DeleteWithButton;
