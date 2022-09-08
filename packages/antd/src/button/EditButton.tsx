import React, { FC } from 'react';
import { useResourceContext, useCreatePath } from '@stbui/prophet-core';
import { Button, ButtonProps } from 'antd';

export interface EditButtonProps extends ButtonProps {
    label?: string;
}

const EditButton: FC<EditButtonProps> = props => {
    const { label, id, size, type, ...rest } = props;
    const resource = useResourceContext(props);
    const createPath = useCreatePath();
    const record = useRecordContext(props);
    if (!record) return null;

    return (
        <Button
            type={type}
            size={size}
            onClick={() =>
                createPath({ resource, type: 'edit', id: record.id })
            }
            {...rest}
        >
            {label}
        </Button>
    );
};

EditButton.defaultProps = {
    label: '编辑',
    size: 'small',
    type: 'link',
};

export default EditButton;
