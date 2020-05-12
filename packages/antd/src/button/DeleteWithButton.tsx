import React, { FunctionComponent } from 'react';
import { useDeleteController } from '@stbui/prophet-core';
import { message, Button } from 'antd';

export interface DeleteButtonViewProps {
    basePath?: string;
    label?: string;
    record?: any;
    update?: any;
    size?: any;
    type?: any;
}

export const DeleteWithButtonView: FunctionComponent<DeleteButtonViewProps> = ({
    label,
    update,
    record,
    size,
    type,
    ...reset
}) => {
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
        <Button type={type} onClick={onConfirm} size={size} {...reset}>
            {label}
        </Button>
    );
};

DeleteWithButtonView.defaultProps = {
    size: 'small',
    type: 'link',
};

export const DeleteWithButton = props => (
    <DeleteWithButtonView {...props} {...useDeleteController(props)} />
);

export default DeleteWithButton;
