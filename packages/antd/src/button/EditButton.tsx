import React, { FC } from 'react';
import { useRedirect } from '@stbui/prophet-core';
import { Button, ButtonProps } from 'antd';

export interface EditButtonProps extends ButtonProps {
    basePath: string;
    label?: string;
}

const EditButton: FC<EditButtonProps> = ({
    basePath,
    label,
    id,
    size,
    type,
    ...rest
}) => {
    const redirect = useRedirect();

    return (
        <Button
            type={type}
            size={size}
            onClick={() => redirect('edit', basePath, id)}
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
