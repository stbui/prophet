import React, { FunctionComponent } from 'react';
import { useDeleteController, useTranslate } from '@stbui/prophet-core';
import { Popconfirm, Button } from 'antd';

export interface DeleteButtonConfirmProps {
    basePath?: string;
    label?: string;
    record?: any;
    remove?: any;
    deleting?: any;
    size?: any;
    type?: any;
    okText?: any;
    popConfirm?: any;
}

const DeleteWithConfirmButton: FunctionComponent<DeleteButtonConfirmProps> = ({
    label,
    remove,
    record,
    deleting,
    size,
    type,
    okText,
    popConfirm,
    ...rest
}) => {
    const translate = useTranslate();

    return (
        <Popconfirm
            title={translate('prophet.message.delete_content')}
            okText={okText}
            cancelText={translate('prophet.action.cancel')}
            onConfirm={() => remove(record.id, record)}
            {...popConfirm}
        >
            <Button type={type} size={size} loading={deleting} {...rest}>
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
