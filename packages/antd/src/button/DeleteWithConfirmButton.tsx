import React, { FunctionComponent } from 'react';
import { useDeleteController, useTranslate } from '@stbui/prophet-core';
import { Popconfirm, message, Button } from 'antd';

export interface DeleteButtonConfirmProps {
    basePath?: string;
    label?: string;
    record?: any;
    update?: any;
    size?: any;
    type?: any;
    okText?: any;
}

const DeleteWithConfirmButton: FunctionComponent<DeleteButtonConfirmProps> = ({
    label,
    update,
    record,
    size,
    type,
    okText,
    ...rest
}) => {
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
            <Button type={type} size={size} {...rest}>
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
