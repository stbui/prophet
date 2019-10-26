import React from 'react';
import { useDeleteController, useTranslate } from '@stbui/prophet-core';
import { Popconfirm, message, Button } from 'antd';

const DeleteWithConfirmButton = props => {
    const {
        label,
        disabled,
        className,
        style,
        update,
        record,
        size,
        type,
        okText,
    } = props;
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
            okText={okText}
            cancelText={translate('prophet.action.cancel')}
            onConfirm={onConfirm}
        >
            <Button
                type={type}
                disabled={disabled}
                className={className}
                style={style}
                size={size}
            >
                {label}
            </Button>
        </Popconfirm>
    );
};

DeleteWithConfirmButton.defaultProps = {
    size: 'small',
    type: 'link',
    okText: '确定',
};

const DeleteWithButton = props => (
    <DeleteWithConfirmButton {...props} {...useDeleteController(props)} />
);

export default DeleteWithButton;
