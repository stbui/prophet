import React, { FC } from 'react';
import { useDeleteController } from '@stbui/prophet-core';
import { Button } from 'antd';

export interface DeleteButtonViewProps {
    basePath?: string;
    label?: string;
    record?: any;
    remove?: any;
    deleting?: any;
    size?: any;
    type?: any;
}

export const DeleteWithButtonView: FC<DeleteButtonViewProps> = ({
    label,
    remove,
    record,
    deleting,
    size,
    type,
    ...reset
}) => {
    return (
        <Button
            type={type}
            size={size}
            loading={deleting}
            onClick={() => remove(record.id, record)}
            {...reset}
        >
            {label}
        </Button>
    );
};

DeleteWithButtonView.defaultProps = {
    label: '删除',
    size: 'small',
    type: 'link',
};

export const DeleteWithButton = props => (
    <DeleteWithButtonView {...props} {...useDeleteController(props)} />
);

export default DeleteWithButton;
